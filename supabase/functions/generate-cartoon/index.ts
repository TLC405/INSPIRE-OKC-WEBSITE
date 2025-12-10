import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, styleId, prompt, negativePrompt, fingerprintHash, sessionId } = await req.json();
    
    if (!imageUrl || !styleId) {
      throw new Error("Missing imageUrl or styleId");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Initialize Supabase client for limit checking
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check generation limits if fingerprint provided
    if (fingerprintHash) {
      const today = new Date().toISOString().split('T')[0];
      
      // Get today's count
      const { data: limitData } = await supabase
        .from('generation_limits')
        .select('generation_count, is_tlc_friend')
        .eq('fingerprint_hash', fingerprintHash)
        .eq('generation_date', today)
        .maybeSingle();

      const currentCount = limitData?.generation_count || 0;
      const isFriend = limitData?.is_tlc_friend || false;
      const dailyLimit = isFriend ? 10 : 1;

      if (currentCount >= dailyLimit) {
        console.log(`Rate limit exceeded for fingerprint: ${fingerprintHash}`);
        return new Response(
          JSON.stringify({ 
            error: "Daily generation limit reached",
            remaining: 0,
            dailyLimit,
            isFriend
          }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          }
        );
      }
    }

    // Use the prompt from client (built by TeeFeeMeStyleEngine) or fallback
    const fullPrompt = prompt || `Create a cartoon portrait in style ${styleId} from this photo. Preserve identity exactly.`;

    console.log("Generating cartoon with style:", styleId, "for fingerprint:", fingerprintHash);
    const startTime = Date.now();

    // Call Lovable AI image generation
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: fullPrompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    const generationDuration = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to continue.");
      }
      
      throw new Error(`AI generation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received in", generationDuration, "ms");

    // Extract the generated image
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImageUrl) {
      throw new Error("No image generated from AI");
    }

    // Update generation limit count
    if (fingerprintHash) {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: existing } = await supabase
        .from('generation_limits')
        .select('id, generation_count')
        .eq('fingerprint_hash', fingerprintHash)
        .eq('generation_date', today)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('generation_limits')
          .update({ generation_count: existing.generation_count + 1 })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('generation_limits')
          .insert({
            fingerprint_hash: fingerprintHash,
            generation_date: today,
            generation_count: 1
          });
      }

      // Update device fingerprint last seen
      await supabase
        .from('device_fingerprints')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('fingerprint_hash', fingerprintHash);
    }

    return new Response(
      JSON.stringify({ 
        imageUrl: generatedImageUrl,
        generationDuration,
        styleId
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in generate-cartoon:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

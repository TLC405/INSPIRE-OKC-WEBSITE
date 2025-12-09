import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Style-specific prompts
const stylePrompts: Record<string, string> = {
  "ADULT-A1": "Simpsons-style suburban parody cartoon with warm yellow tones, thick black outlines, simplified features, 4-finger hands, oval eyes, exaggerated overbite",
  "ADULT-A2": "Family Guy-style pastel sitcom cartoon with oval eyes, thin lines, soft shading, rounded features, realistic proportions",
  "ADULT-A3": "South Park-style flat cutout cartoon with construction paper aesthetic, no shading, simple shapes, minimal detail, centered",
  "ADULT-A4": "Rick and Morty-style neon sci-fi cartoon with acid green/blue colors, dramatic rim lighting, exaggerated expressions, spiky hair",
  "ADULT-A5": "King of the Hill grounded cartoon style with natural proportions, warm earth tones, realistic shading, detailed facial features",
  "ADULT-A6": "Ren & Stimpy gritty grotesque cartoon style with heavy texture, exaggerated veins, detailed gross-out elements, sickly palette, high detail",
  "ADULT-A7": "Beavis & Butthead crude teen cartoon style with flat colors, minimal shading, angular features, simple background",
  "KIDS-K1": "SpongeBob undersea absurdist cartoon style with bright colors, bubbly effects, dotted shading, cheerful expression",
  "KIDS-K2": "Pokémon adventure anime style with manga lines, tri-tone cel shading, sparkle effects, determined expression",
  "KIDS-K3": "Classic Toontown rubber-hose animation style with curved limbs, pie-cut eyes, white gloves, bouncy energy",
  "KIDS-K4": "Peppa Pig minimal nursery cartoon style with thin lines, high-key colors, simple shapes, side profile view",
  "KIDS-K5": "Doraemon-inspired blue robo-cat world cartoon style with clean lines, sky blue palette, rounded features, friendly expression",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, styleId } = await req.json();
    
    if (!imageUrl || !styleId) {
      throw new Error("Missing imageUrl or styleId");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Get style-specific prompt
    const stylePrompt = stylePrompts[styleId] || "cartoon style";

    // Build the full prompt with identity constraints
    const fullPrompt = `Create a ${stylePrompt} portrait from this photo.

CRITICAL IDENTITY REQUIREMENTS:
- Preserve exact facial proportions: inter-pupil distance, eye shape, nose width, lip contour, jawline
- Maintain skin tone and undertone exactly
- Keep hair color, texture, and style
- Preserve any glasses, facial hair, or distinguishing features
- DO NOT de-age, lighten skin, slim face, or change eye color
- Person must be 100% recognizable as the same individual

STYLE REQUIREMENTS:
- Apply the specified cartoon style aesthetics
- Waist-up portrait, face unobstructed
- Clean linework appropriate to style
- TV-show-inspired but NOT copying trademarked frames/logos
- Friendly expression, 4:5 or 1:1 aspect ratio
- High resolution, no text, no watermark

NEGATIVE CONSTRAINTS:
- No warped eyes, extra limbs, double face
- No bad hands, heavy blur, posterization
- No logos, brand names, or trademarked characters
- No weird artifacts or distortions`;

    console.log("Generating cartoon with style:", styleId);

    // Call Lovable AI image generation
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
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
    console.log("AI response received");

    // Extract the generated image
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImageUrl) {
      throw new Error("No image generated from AI");
    }

    return new Response(
      JSON.stringify({ imageUrl: generatedImageUrl }),
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

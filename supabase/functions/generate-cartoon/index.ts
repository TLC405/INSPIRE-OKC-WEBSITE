import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Full style configurations with FaceLock 2.0, scenes, and TLC easter eggs
const styleConfigs: Record<string, {
  prompt: string;
  scene: string;
  easterEgg: string;
  loadingMessage: string;
}> = {
  "ADULT-A1": {
    prompt: "Simpsons-style cartoon with warm yellow skin tone, thick black outlines, simplified features, 4-finger hands, oval eyes, exaggerated overbite, Matt Groening aesthetic",
    scene: "Springfield living room with iconic orange couch, blue lamp, family portrait on wall, TV in corner, window showing backyard",
    easterEgg: "TLC initials carved into a book spine on the bookshelf",
    loadingMessage: "Transporting you to Springfield..."
  },
  "ADULT-A2": {
    prompt: "Family Guy-style pastel cartoon with oval eyes, thin clean lines, soft cel shading, rounded features, Seth MacFarlane aesthetic",
    scene: "Quahog living room with green couch, window view of suburban neighborhood, ceiling fan, warm lighting",
    easterEgg: "TLC written on a newspaper headline on the coffee table",
    loadingMessage: "Heading to Quahog..."
  },
  "ADULT-A3": {
    prompt: "South Park-style flat cutout cartoon with construction paper aesthetic, no shading, simple geometric shapes, minimal detail, centered composition",
    scene: "Snowy Colorado town street with mountains in background, school bus stop sign, winter atmosphere",
    easterEgg: "TLC graffiti on the bus stop sign post",
    loadingMessage: "Welcome to South Park..."
  },
  "ADULT-A4": {
    prompt: "Rick and Morty-style neon sci-fi cartoon with acid green and electric blue colors, dramatic rim lighting, exaggerated expressions, spiky details, interdimensional aesthetic",
    scene: "Portal laboratory with swirling green interdimensional portals, bubbling beakers, sci-fi equipment, neon glow everywhere",
    easterEgg: "TLC written on a beaker label on the lab bench",
    loadingMessage: "Opening interdimensional portal..."
  },
  "ADULT-A5": {
    prompt: "King of the Hill-style grounded realistic cartoon with natural proportions, warm earth tones, realistic shading, detailed facial features, Texas suburban aesthetic",
    scene: "Texas backyard with propane grill, wooden fence, clear blue sky, neatly trimmed lawn, alley view",
    easterEgg: "TLC logo on a propane tank sticker",
    loadingMessage: "I tell you hwat..."
  },
  "ADULT-A6": {
    prompt: "Ren & Stimpy-style grotesque cartoon with heavy texture, exaggerated veiny details, gross-out elements, sickly color palette, extreme expressions, John K aesthetic",
    scene: "Chaotic cartoon living room with tilted perspective, weird stained furniture, cracked walls, surreal lighting",
    easterEgg: "TLC carved into a wooden table surface",
    loadingMessage: "Getting grotesque..."
  },
  "ADULT-A7": {
    prompt: "Beavis & Butthead-style crude teen cartoon with flat muted colors, minimal shading, angular features, deliberately ugly aesthetic, MTV 90s style",
    scene: "Messy teenager bedroom with TV showing static, heavy metal band posters on walls, nachos on floor",
    easterEgg: "TLC as a band name on a poster on the wall",
    loadingMessage: "Heh heh, this is gonna be cool..."
  },
  "KIDS-K1": {
    prompt: "SpongeBob-style undersea cartoon with bright saturated colors, bubbly effects, dotted halftone shading, cheerful exaggerated expressions, Stephen Hillenburg aesthetic",
    scene: "Bikini Bottom underwater scene with floating bubbles, colorful coral, pineapple house visible in background, sunlight rays from above",
    easterEgg: "TLC written in the sand on the ocean floor",
    loadingMessage: "Diving into Bikini Bottom..."
  },
  "KIDS-K2": {
    prompt: "Pokémon adventure anime style with clean manga lines, tri-tone cel shading, sparkle effects, determined expression, Ken Sugimori inspired",
    scene: "Grassy Pokémon battle arena with scattered Pokéballs, trees in background, dramatic sky, stadium atmosphere",
    easterEgg: "TLC as a badge design on the trainer's jacket lapel",
    loadingMessage: "Gotta catch 'em all..."
  },
  "KIDS-K3": {
    prompt: "Classic Toontown 1930s rubber-hose animation style with curved elastic limbs, pie-cut eyes, white gloves, bouncy energy, vintage Disney/Fleischer aesthetic",
    scene: "1930s black and white cartoon backdrop with floating music notes, stars, bouncing theatrical stage",
    easterEgg: "TLC on a vintage theater marquee in the background",
    loadingMessage: "That's all folks... wait, wrong studio!"
  },
  "KIDS-K4": {
    prompt: "Peppa Pig minimal nursery cartoon with thin simple lines, high-key pastel colors, basic geometric shapes, side profile view, Astley Baker Davies style",
    scene: "Bright sunny countryside with rolling green hills, simple house with red roof, blue sky with puffy clouds",
    easterEgg: "TLC spelled out in a rainbow arc in the sky",
    loadingMessage: "Oink oink!"
  },
  "KIDS-K5": {
    prompt: "Doraemon-inspired futuristic robo-cat world cartoon with clean precise lines, sky blue palette, rounded friendly features, Fujiko F. Fujio aesthetic",
    scene: "Futuristic Japanese bedroom with magical gadget drawers, flying objects, Anywhere Door, high-tech toys",
    easterEgg: "TLC on a gadget control panel label",
    loadingMessage: "Pulling out the magic pocket..."
  }
};

// FaceLock 2.0 Ultra-Precise Identity Preservation Prompt
const FACELOCK_PROMPT = `
FACELOCK 2.0 ULTRA-PRECISION IDENTITY REQUIREMENTS (MANDATORY - DO NOT DEVIATE):

1. FACIAL GEOMETRY: Preserve EXACT inter-pupil distance, nose bridge width, nostril shape, lip thickness ratio, jawline contour, chin shape, cheekbone prominence, forehead height, ear size and shape

2. JEWELRY: Keep ALL visible jewelry in EXACT position and style - rings on correct fingers with accurate design, earrings (studs/hoops/dangles), necklaces with pendants, piercings in exact locations, watches, bracelets

3. TATTOOS: Preserve EVERY visible tattoo with EXACT design, size, color saturation, and precise body placement - no simplification or modification

4. FACIAL MARKS: Keep ALL moles, freckles, scars, birthmarks, beauty marks, dimples in their EXACT locations and relative sizes

5. GLASSES: If wearing glasses, maintain EXACT frame style, color, lens shape, thickness, and position on face - no modifications

6. FACIAL HAIR: Preserve EXACT beard shape, density, color (including grays), mustache style, sideburns, stubble pattern, hairline edges

7. SKIN: Maintain EXACT skin tone, undertone (warm/cool/neutral), texture, visible pores, wrinkles, expression lines, age indicators - ABSOLUTELY NO lightening, NO smoothing, NO de-aging, NO beautification

8. HAIR: Keep EXACT hair color (including highlights, grays, roots), texture (straight/wavy/curly/coily), length, part location, styling, volume, any unique characteristics

9. EXPRESSION: Maintain the natural expression and emotion visible in the original photo

10. BODY FEATURES: If shoulders/body visible, keep accurate body type, posture, clothing style and colors

CRITICAL: The person MUST be 100% RECOGNIZABLE as themselves. If their own mother wouldn't immediately recognize them, the generation has FAILED. Err on the side of accuracy over stylization.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, styleId, fingerprintHash, sessionId } = await req.json();
    
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

    // Get style configuration
    const styleConfig = styleConfigs[styleId];
    if (!styleConfig) {
      throw new Error(`Unknown style: ${styleId}`);
    }

    // Build the complete generation prompt
    const fullPrompt = `Create a ${styleConfig.prompt} portrait from this photo.

${FACELOCK_PROMPT}

SCENE PLACEMENT (REQUIRED):
- Place the person INTO this scene: ${styleConfig.scene}
- The person is the MAIN CHARACTER and ONLY human/character face in the scene
- Position: waist-up portrait, centered, face clearly visible and unobstructed
- The person naturally belongs in this cartoon world
- Background elements complement but don't overshadow the person

OUTPUT REQUIREMENTS:
- High resolution, clean linework appropriate to style
- TV-show quality but NOT copying any trademarked frames/logos/characters
- 4:5 or 1:1 aspect ratio
- No text overlays, no watermarks, no artifacts
- No warped eyes, extra limbs, double faces, weird hands
- Friendly, approachable expression`;

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
        styleId,
        loadingMessage: styleConfig.loadingMessage
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

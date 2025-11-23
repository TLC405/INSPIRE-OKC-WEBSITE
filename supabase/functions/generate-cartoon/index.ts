import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Style-specific prompts with enhanced identity preservation
const stylePrompts: Record<string, string> = {
  // Adult Animation Styles - Enhanced for better identity preservation
  "ADULT-A1": "Transform this person into The Simpsons animation style while preserving their unique facial structure and identity. Apply: bright yellow skin (#FFD90F), maintain their actual face shape and proportions, keep their distinctive features (nose shape, eye spacing, jawline), four-fingered hands, large white oval eyes with small black pupils positioned where their real eyes are, preserve their real hairstyle but simplify with thick black outlines, exaggerated overbite only if they have one, thick black character outlines, flat cel-shaded coloring, warm suburban color palette. CRITICAL: Keep their recognizable facial geometry and expression.",
  
  "ADULT-A2": "Transform this person into Family Guy animation style while maintaining facial recognition. Apply: smooth oval white eyes with black pupils positioned at their real eye locations, preserve their actual face shape (round/square/oval), keep their real nose shape but slightly simplified, maintain jawline and cheekbones, thin clean black outlines, smooth cel-shading with pastel skin tones, preserve their hairstyle with simplified vector rendering, keep any distinctive features like dimples or facial structure. CRITICAL: Their face shape and proportions must remain identifiable.",
  
  "ADULT-A3": "Transform this person into South Park cutout style while keeping them recognizable. Apply: simplified geometric construction paper aesthetic, circular or oval head matching their face shape, minimal but accurate facial feature placement (preserve eye spacing, nose position, mouth), flat matte colors, very simple shapes, construction paper texture. CRITICAL: Despite extreme simplification, maintain their distinctive facial proportions and feature arrangement so they're still identifiable.",
  
  "ADULT-A4": "Transform this person into Rick and Morty animation style preserving identity. Apply: exaggerated sci-fi features while keeping their base face shape, maintain their real eye shape but enlarge with visible iris detail, preserve their actual hairstyle with spiky stylization, keep their nose shape, add sci-fi elements, acid color palette (neon greens, purples, blues), dramatic rim lighting, preserve facial structure and proportions, energetic expression matching their real photo. CRITICAL: Keep recognizable facial geometry.",
  
  "ADULT-A5": "Transform this person into King of the Hill animation style with realistic accuracy. Apply: maintain realistic human proportions exactly as they are, preserve all facial features accurately (nose, eyes, mouth, jaw), natural skin tones matching their real complexion, keep their exact hairstyle with clean lines, grounded suburban aesthetic, subtle realistic rendering with minimal stylization. CRITICAL: This style requires the MOST facial accuracy - they should look like a slightly simplified but very recognizable version of themselves.",
  
  "ADULT-A6": "Transform this person into Ren & Stimpy grotesque style while keeping facial identity. Apply: extreme exaggeration of their actual features (if they have a large nose, make it HUGE; small eyes, make them BULGING), hyper-detailed texture showing pores and imperfections, preserve their real facial structure but distort grotesquely, maintain their face shape, rubber-hose body, intense saturated colors, deliberately ugly but RECOGNIZABLE aesthetic. CRITICAL: Exaggerate their real features, don't replace them.",
  
  "ADULT-A7": "Transform this person into Beavis and Butthead crude style maintaining identity. Apply: angular geometric version of their actual face shape, preserve their facial feature placement, crude flat coloring, minimal shading, keep their real hairstyle but angular, maintain nose shape, eye spacing, jaw structure but render crudely, MTV 90s aesthetic. CRITICAL: Despite crude rendering, their facial structure must be identifiable.",
  
  // Kids Animation Styles - Enhanced for identity preservation
  "KIDS-K1": "Transform this person into SpongeBob SquarePants animation style keeping them recognizable. Apply: bright nautical colors, thick black outlines, preserve their face shape and feature placement, maintain their eye spacing and real eye shape (but larger and more expressive), keep their nose shape, preserve hairstyle with bright coloring, undersea aesthetic elements, bubble details. CRITICAL: Keep their actual facial proportions within the SpongeBob art style.",
  
  "KIDS-K2": "Transform this person into Pokémon anime style preserving identity. Apply: large expressive anime eyes positioned at their real eye locations, maintain their actual face shape (important for recognition), preserve nose shape, keep their real hairstyle with anime styling and colors, manga-style features, bright saturated palette, anime cel-shading with highlights, preserve facial proportions and structure. CRITICAL: Their face shape and feature arrangement must remain accurate.",
  
  "KIDS-K3": "Transform this person into Classic Toontown rubber-hose animation style keeping identity. Apply: circular vintage cartoon features while preserving their base face shape, large white gloves, pie-eyes positioned where their real eyes are, maintain their facial proportions, keep their hairstyle with vintage styling, bouncy proportions, 1930s animation aesthetic. CRITICAL: Despite vintage simplification, preserve their recognizable facial structure.",
  
  "KIDS-K4": "Transform this person into Peppa Pig minimal geometric style maintaining recognition. Apply: extremely simple geometric shapes that match their face (round face = circular shape, long face = oval shape), side-view profile if appropriate, preserve their relative feature sizes and positions, flat pastel colors, no shading, nursery aesthetic. CRITICAL: Even with extreme minimalism, their basic face shape and proportions must be preserved.",
  
  "KIDS-K5": "Transform this person into Doraemon anime style preserving features. Apply: clean manga lines, large round eyes at their real eye position, preserve their face shape, maintain their nose shape, keep their real hairstyle with bright anime colors, simplified but cute features matching their face, bright primary colors, minimal clean shading, friendly aesthetic. CRITICAL: Keep their facial geometry and proportions accurate within the Doraemon style.",
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
    const fullPrompt = `IDENTITY PRESERVATION IS CRITICAL: ${stylePrompt}

REQUIREMENTS:
1. The transformed person MUST be clearly recognizable as the same individual from the input photo
2. Preserve the exact face shape, eye spacing, nose shape, mouth position, and jawline
3. Maintain their real hairstyle (color can change to match style, but shape/volume stays same)
4. Keep all distinctive facial features that make them unique
5. Apply the animation style AS A LAYER over their real features, not replacing them
6. If they're smiling in the photo, keep the smile; if serious, keep that expression
7. High quality professional cartoon transformation
8. The final result should look like "this specific person drawn in [style]" not "a generic [style] character"

VERIFICATION: After generation, this person's family/friends should immediately recognize them in the cartoon style.

NEGATIVE CONSTRAINTS:
- No warped eyes, extra limbs, double face, completely different person
- No wrong face shape, unrecognizable features, changed identity
- No swapped features, random face, generic face
- No bad hands, heavy blur, excessive distortion
- No logos, brand names, or trademarked characters`;

    console.log("Generating high-quality identity-preserving cartoon with style:", styleId);

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

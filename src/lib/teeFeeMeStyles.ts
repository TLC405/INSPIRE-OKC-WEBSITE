export type TeeFeeMeCategory =
  | 'tv_cartoon'
  | 'adult_cartoon'
  | 'anime'
  | 'game'
  | 'movie_3d'
  | 'movie_2d'
  | 'avatar';

export interface TeeFeeMeStyle {
  id: string;
  label: string;
  franchise: string;
  category: TeeFeeMeCategory;
  basePrompt: string;
  safetyPrompt: string;
  negativePrompt: string;
  loadingMessage: string;
  description: string;
}

export interface StylePromptInput {
  styleId: string;
  subjectHint: string;
  lightingHint?: string;
  moodHint?: string;
  extraNotes?: string;
}

export interface BuiltStylePrompt {
  styleId: string;
  fullPrompt: string;
  negativePrompt: string;
}

// FaceLock 2.0 - Identity Preservation
const FACELOCK_PROMPT = `
IDENTITY PRESERVATION (MANDATORY):
- Preserve EXACT facial geometry: inter-pupil distance, nose shape, lip ratio, jawline, chin
- Keep ALL jewelry in exact position: rings, earrings, necklaces, piercings
- Preserve ALL tattoos with exact design, size, color, and placement
- Keep ALL facial marks: moles, freckles, scars, birthmarks, dimples in exact locations
- Maintain EXACT glasses frame style, color, and position if worn
- Preserve facial hair exactly: beard shape, mustache, stubble pattern
- Maintain skin tone, texture, wrinkles, age indicators - NO lightening, NO smoothing
- Keep exact hair color, texture, length, styling
- The person MUST be 100% recognizable as themselves
`;

const SAFETY_BASE = `
Safe for all ages, no gore, no horror, no explicit content.
No offensive symbols or messages.
Keep anatomy clean and natural, no extra limbs or fingers.
`;

const NEGATIVE_BASE = `gore, blood, dismemberment, explicit content, offensive symbols, distorted face, extra limbs, extra fingers, body horror, glitch art, watermark, brand logo, text overlay`;

export const TEEFEE_ME_STYLES: TeeFeeMeStyle[] = [
  // ===== TV CARTOONS =====
  {
    id: 'simpsons_prime_time',
    label: 'The Simpsons',
    franchise: 'The Simpsons',
    category: 'tv_cartoon',
    description: 'Yellow Springfield vibes with bold outlines',
    loadingMessage: 'Transporting you to Springfield...',
    basePrompt: `2D cartoon portrait in the style of The Simpsons TV show. Character drawn with rounded features, overbite mouth, large circular white eyes with small black pupils. Skin rendered in classic yellow tone with simple shadows. Bold clean black outlines, flat cell shading with minimal gradients. Background inspired by Springfield interiors: pastel walls, simple furniture. Composition centered on character from shoulders up, friendly expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'south_park_cutout',
    label: 'South Park',
    franchise: 'South Park',
    category: 'adult_cartoon',
    description: 'Flat paper cutout with Colorado vibes',
    loadingMessage: 'Welcome to South Park...',
    basePrompt: `Flat paper cutout cartoon portrait in the style of South Park. Simple geometric shapes, minimal shading, circular heads with simple dot eyes. Construction paper aesthetic with visible texture. Snowy Colorado mountain town background. Simple limbs and body, bright primary colors. Character facing forward with simple expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'family_guy_quahog',
    label: 'Family Guy',
    franchise: 'Family Guy',
    category: 'adult_cartoon',
    description: 'Clean pastel suburban comedy style',
    loadingMessage: 'Heading to Quahog...',
    basePrompt: `2D cartoon portrait in Family Guy style. Clean outlines, large oval eyes, soft cell shading. Rounded facial features with simple shadows. Pastel suburban background with living room or street view. Warm lighting, simple furniture shapes. Character from waist up with casual expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'rick_morty_portal',
    label: 'Rick and Morty',
    franchise: 'Rick and Morty',
    category: 'adult_cartoon',
    description: 'Neon sci-fi with interdimensional chaos',
    loadingMessage: 'Opening interdimensional portal...',
    basePrompt: `Cartoon portrait in Rick and Morty style. Sharp angular features, sketchy but clean lines. Acid green and electric blue sci-fi color palette. Lab background with swirling green portals, bubbling beakers, neon glow. Exaggerated expressions, slightly manic energy. Character centered with dramatic rim lighting.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'boondocks_urban',
    label: 'The Boondocks',
    franchise: 'The Boondocks',
    category: 'adult_cartoon',
    description: 'Anime-influenced urban style with sharp detail',
    loadingMessage: 'Welcome to Woodcrest...',
    basePrompt: `Anime-influenced cartoon portrait in The Boondocks style. Sharp defined eyes with detailed irises, realistic hair with individual strands. Rich shading and dramatic lighting. Urban or suburban background with trees and houses. Dynamic pose, confident expression. Warm skin tones with careful highlights and shadows.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'king_of_hill_texas',
    label: 'King of the Hill',
    franchise: 'King of the Hill',
    category: 'adult_cartoon',
    description: 'Grounded Texas suburban realism',
    loadingMessage: 'I tell you hwat...',
    basePrompt: `Realistic cartoon portrait in King of the Hill style. Natural proportions, warm earth tones. Detailed facial features with realistic shading. Texas backyard background with propane grill, wooden fence, blue sky. Clean linework, grounded suburban aesthetic. Character with understated expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'archer_spy',
    label: 'Archer',
    franchise: 'Archer',
    category: 'adult_cartoon',
    description: 'Sleek mid-century spy aesthetic',
    loadingMessage: 'Do you want ants? Because...',
    basePrompt: `Stylized cartoon portrait in Archer TV show style. Clean geometric shapes, bold solid colors, minimal gradients. Strong jawlines and angular features. Mid-century modern spy agency background or sleek office. Dramatic shadows, film noir lighting influence. Confident sophisticated expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },

  // ===== ANIME =====
  {
    id: 'dbz_saiyan',
    label: 'Dragon Ball Z',
    franchise: 'Dragon Ball Z',
    category: 'anime',
    description: 'Power-up energy with spiky intensity',
    loadingMessage: 'Powering up to over 9000...',
    basePrompt: `Anime portrait in Dragon Ball Z style. Large expressive eyes with sharp highlights, dramatic spiky hair with dynamic flow. Bold black outlines, vibrant cel shading. Rocky battle arena or mountain background with dramatic sky. Power aura effects, intense determined expression. Strong muscular build if full body visible.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'naruto_ninja',
    label: 'Naruto',
    franchise: 'Naruto',
    category: 'anime',
    description: 'Hidden leaf ninja with whisker marks optional',
    loadingMessage: 'Believe it! Dattebayo!',
    basePrompt: `Anime portrait in Naruto style. Sharp defined eyes, dynamic spiky or flowing hair. Clean cel shading with bold colors. Hidden village background with traditional Japanese architecture and forest. Ninja headband or clothing optional. Determined confident expression. Warm skin tones with clear highlights.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'one_piece_pirate',
    label: 'One Piece',
    franchise: 'One Piece',
    category: 'anime',
    description: 'Grand Line adventure with bold expressions',
    loadingMessage: 'Setting sail for adventure...',
    basePrompt: `Anime portrait in One Piece style. Exaggerated expressive features, large eyes with sparkle highlights. Bold black outlines, vibrant saturated colors. Ocean and pirate ship deck background, sunny blue sky. Big confident smile, adventurous spirit. Dynamic hair movement suggesting sea breeze.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'demon_slayer_hashira',
    label: 'Demon Slayer',
    franchise: 'Demon Slayer',
    category: 'anime',
    description: 'Breathtaking ukiyo-e inspired action',
    loadingMessage: 'Total concentration breathing...',
    basePrompt: `Anime portrait in Demon Slayer style. Detailed expressive eyes with gradient colors, flowing hair with individual strands. Ukiyo-e inspired background elements, traditional Japanese forest or mountain. Dramatic lighting with color effects suggesting breathing techniques. Focused determined expression. Rich shading and painterly textures.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'jjk_sorcerer',
    label: 'Jujutsu Kaisen',
    franchise: 'Jujutsu Kaisen',
    category: 'anime',
    description: 'Dark sorcery with cursed energy vibes',
    loadingMessage: 'Channeling cursed energy...',
    basePrompt: `Anime portrait in Jujutsu Kaisen style. Sharp intense eyes, messy dynamic hair. Dark atmospheric background with subtle purple cursed energy effects. Modern Tokyo setting elements. Bold shadows, dramatic contrast. Cool confident or intense expression. Contemporary clothing style.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'aot_scout',
    label: 'Attack on Titan',
    franchise: 'Attack on Titan',
    category: 'anime',
    description: 'Survey Corps intensity with dramatic lighting',
    loadingMessage: 'Dedicating your heart...',
    basePrompt: `Anime portrait in Attack on Titan style. Sharp defined features, intense determined eyes. Detailed hair with realistic texture. Dramatic cloudy sky background with stone walls. Military aesthetic with green cape elements optional. Strong contrast lighting, serious or determined expression. Gritty realistic anime style.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'mha_hero',
    label: 'My Hero Academia',
    franchise: 'My Hero Academia',
    category: 'anime',
    description: 'Plus Ultra superhero academy style',
    loadingMessage: 'Going Plus Ultra!',
    basePrompt: `Anime portrait in My Hero Academia style. Large expressive eyes with detailed irises, dynamic styled hair. Bright vibrant colors, clean cel shading. Hero academy or city background. Action lines and energy effects optional. Heroic determined expression. Bold outlines, saturated hero costume colors.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'ghibli_wonder',
    label: 'Studio Ghibli',
    franchise: 'Studio Ghibli',
    category: 'anime',
    description: 'Soft magical wonder with painted backgrounds',
    loadingMessage: 'Entering a world of wonder...',
    basePrompt: `Anime portrait in Studio Ghibli style. Soft rounded features, large gentle eyes with simple highlights. Hand-painted watercolor background with lush nature, blue sky, fluffy clouds. Warm natural lighting, peaceful atmosphere. Gentle curious expression. Soft color palette with earthy greens and sky blues.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },

  // ===== GAMES =====
  {
    id: 'mario_pixel',
    label: 'Super Mario',
    franchise: 'Super Mario Bros',
    category: 'game',
    description: 'Classic pixel sprite with mushroom kingdom colors',
    loadingMessage: 'Lets-a go!',
    basePrompt: `Pixel art sprite portrait in Super Mario Bros style. Small pixel character, visible pixel grid, bright primary colors. Simple shading with limited palette. Blue sky background with green hills and question blocks. Cheerful expression, round friendly features. Classic 16-bit game aesthetic.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'zelda_botw',
    label: 'Zelda: Breath of the Wild',
    franchise: 'The Legend of Zelda',
    category: 'game',
    description: 'Soft cel-shaded adventure with painterly skies',
    loadingMessage: 'A new adventure awaits...',
    basePrompt: `Soft cel-shaded portrait in Breath of the Wild style. Gentle painterly aesthetic, soft outlines. Open sky background with distant mountains and fields. Warm natural lighting, watercolor-like textures. Adventurous calm expression. Muted natural color palette with soft blues and greens.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'cuphead_vintage',
    label: 'Cuphead',
    franchise: 'Cuphead',
    category: 'game',
    description: '1930s rubber-hose cartoon with vintage charm',
    loadingMessage: 'A good day for a swell battle!',
    basePrompt: `1930s rubber-hose cartoon portrait in Cuphead style. Vintage ink and paint aesthetic, slightly grainy texture. Large expressive pie-cut eyes, bendy limbs. Off-white and sepia background with art deco elements. Limited old-timey color palette: red, yellow, black, white. Cheerful vintage cartoon expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'minecraft_blocky',
    label: 'Minecraft',
    franchise: 'Minecraft',
    category: 'game',
    description: 'Blocky voxel cube head with pixel textures',
    loadingMessage: 'Mining and crafting...',
    basePrompt: `Blocky voxel portrait in Minecraft style. Square head and body, flat pixel textures. Grassy block floor and bright blue sky background. Low-detail pixelated face, simple eyes and mouth. Recognizable hairstyle and colors translated to blocks. Clean cubic shapes, simple lighting.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'fortnite_hero',
    label: 'Fortnite',
    franchise: 'Fortnite',
    category: 'game',
    description: 'Stylized battle royale with saturated hero vibes',
    loadingMessage: 'Dropping in...',
    basePrompt: `Stylized 3D portrait in Fortnite style. Smooth surfaces, saturated vibrant colors. Clean armor or clothing shapes, strong silhouettes. Soft HDR game lighting, colorful sky background. Confident heroic expression. Bold stylized proportions, slightly exaggerated features.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'overwatch_hero',
    label: 'Overwatch',
    franchise: 'Overwatch',
    category: 'game',
    description: 'High-end stylized hero shooter aesthetic',
    loadingMessage: 'Heroes never die!',
    basePrompt: `Stylized 3D portrait in Overwatch style. Detailed but stylized features, strong lighting with rim highlights. Bold saturated colors, futuristic elements. Clean heroic aesthetic, confident expression. Smooth surfaces with subtle texture. Dynamic hero shooter energy.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'pokemon_trainer',
    label: 'Pokémon',
    franchise: 'Pokémon',
    category: 'game',
    description: 'Trainer portrait with adventure spirit',
    loadingMessage: 'Gotta catch em all!',
    basePrompt: `Anime portrait in Pokémon trainer style. Large friendly eyes with star highlights, dynamic colorful hair. Bright saturated colors, clean cel shading. Grassy field or town background with blue sky. Pokéball accessories optional. Excited adventurous expression. Warm friendly aesthetic.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },

  // ===== 3D MOVIES =====
  {
    id: 'pixar_soft_3d',
    label: 'Pixar Style',
    franchise: 'Pixar',
    category: 'movie_3d',
    description: 'Soft rounded 3D with cinematic warmth',
    loadingMessage: 'To infinity and beyond...',
    basePrompt: `3D character portrait inspired by Pixar animated movies. Soft rounded facial features with big but natural eyes. Smooth skin textures with subtle details. Hair rendered with clear strands and soft clumps. Warm cinematic lighting with gentle highlights on cheeks and nose. Background slightly out of focus, cozy indoor or soft outdoor environment. Friendly welcoming expression.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE + ', overly realistic gritty textures'
  },
  {
    id: 'disney_3d_modern',
    label: 'Disney 3D',
    franchise: 'Disney Animation',
    category: 'movie_3d',
    description: 'Modern Disney magic with expressive eyes',
    loadingMessage: 'Where dreams come true...',
    basePrompt: `3D character portrait in modern Disney animation style. Large expressive eyes with detailed reflections, smooth stylized features. Rich hair with volume and movement. Magical warm lighting, soft shadows. Fantasy castle or nature background with soft focus. Hopeful dreamy expression. Vibrant but balanced color palette.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'dreamworks_stylized',
    label: 'DreamWorks Style',
    franchise: 'DreamWorks',
    category: 'movie_3d',
    description: 'Expressive comedy with dynamic features',
    loadingMessage: 'Once upon a time...',
    basePrompt: `3D character portrait in DreamWorks animation style. Expressive exaggerated features, dynamic asymmetric expressions. Strong personality in pose and face. Rich textures and detailed environments. Dramatic lighting with comedy warmth. Confident or mischievous expression. Bold saturated colors.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'lego_minifig',
    label: 'LEGO Movie',
    franchise: 'The LEGO Movie',
    category: 'movie_3d',
    description: 'Plastic minifigure with glossy brick aesthetic',
    loadingMessage: 'Everything is awesome!',
    basePrompt: `LEGO minifigure portrait in The LEGO Movie style. Cylindrical yellow head with printed face, claw hands. Glossy plastic textures with visible stud connectors. Brick-built environment background. Cinematic lighting on plastic surfaces. Cheerful minifigure expression. Bright primary colors, toy aesthetic.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },

  // ===== 2D MOVIES =====
  {
    id: 'disney_2d_classic',
    label: 'Disney 2D Classic',
    franchise: 'Disney Animation',
    category: 'movie_2d',
    description: 'Hand-drawn renaissance magic',
    loadingMessage: 'A whole new world...',
    basePrompt: `2D hand-drawn portrait in classic Disney animation style. Elegant line art with varying line weights. Soft watercolor-painted backgrounds. Gentle expressive eyes with careful highlights. Rich hair with flowing movement. Warm theatrical lighting, soft shadows. Hopeful or kind expression. Traditional animation beauty.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'spiderverse_comic',
    label: 'Spider-Verse',
    franchise: 'Spider-Man: Into the Spider-Verse',
    category: 'movie_2d',
    description: 'Comic halftone with dynamic ink edges',
    loadingMessage: 'Anyone can wear the mask...',
    basePrompt: `Stylized portrait in Spider-Verse movie style. Comic book halftone textures, bold ink outlines. Dynamic offset printing effect with slight color misalignment. Urban cityscape background. Bold saturated colors with pop art influence. Confident heroic expression. Motion blur and action lines for energy.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'arcane_painterly',
    label: 'Arcane',
    franchise: 'Arcane: League of Legends',
    category: 'movie_2d',
    description: 'Painterly steampunk with emotional depth',
    loadingMessage: 'Welcome to the undercity...',
    basePrompt: `Painterly portrait in Arcane animation style. Rich textured brushstrokes, dramatic lighting. Deep emotional expression in eyes. Steampunk city or industrial background with warm and cool color contrast. Detailed hair with painterly texture. Strong shadows and highlights, cinematic depth. Complex layered personality.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },

  // ===== AVATAR / SOCIAL =====
  {
    id: 'linkedin_clean',
    label: 'LinkedIn Professional',
    franchise: 'Professional Avatar',
    category: 'avatar',
    description: 'Clean minimal professional headshot',
    loadingMessage: 'Looking professional...',
    basePrompt: `Clean minimalist portrait avatar for professional use. Simple geometric shapes, flat colors with subtle gradients. Neutral or light background. Friendly approachable expression. Modern flat design aesthetic. Clear readable silhouette. Soft natural lighting, business casual vibe.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'tiktok_creator',
    label: 'TikTok Creator',
    franchise: 'Social Media Avatar',
    category: 'avatar',
    description: 'Trendy vibrant creator energy',
    loadingMessage: 'Going viral...',
    basePrompt: `Trendy stylized portrait for social media. Vibrant saturated colors, bold graphic style. Gradient background with modern color transitions. Expressive confident pose, influencer energy. Clean lines with slight glow effects. Contemporary youth aesthetic, dynamic personality.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  },
  {
    id: 'instagram_pastel',
    label: 'Instagram Aesthetic',
    franchise: 'Social Media Avatar',
    category: 'avatar',
    description: 'Soft pastel dreamy aesthetic',
    loadingMessage: 'Curating the feed...',
    basePrompt: `Soft pastel portrait for Instagram aesthetic. Dreamy soft focus, gentle gradients. Pastel pink, lavender, mint color palette. Soft natural lighting, slightly ethereal glow. Peaceful serene expression. Minimalist background with subtle texture. Modern lifestyle aesthetic.`,
    safetyPrompt: SAFETY_BASE,
    negativePrompt: NEGATIVE_BASE
  }
];

export function getStyleById(styleId: string): TeeFeeMeStyle | undefined {
  return TEEFEE_ME_STYLES.find((s) => s.id === styleId);
}

export function getStylesByCategory(category: TeeFeeMeCategory): TeeFeeMeStyle[] {
  return TEEFEE_ME_STYLES.filter((s) => s.category === category);
}

export const CATEGORY_LABELS: Record<TeeFeeMeCategory, string> = {
  tv_cartoon: 'TV Cartoons',
  adult_cartoon: 'Adult Animation',
  anime: 'Anime',
  game: 'Video Games',
  movie_3d: '3D Movies',
  movie_2d: '2D Movies',
  avatar: 'Social Avatars'
};

export function buildStylePrompt(input: StylePromptInput): BuiltStylePrompt {
  const style = getStyleById(input.styleId) ?? TEEFEE_ME_STYLES[0];

  const parts: string[] = [];

  parts.push(style.basePrompt);
  parts.push(FACELOCK_PROMPT);
  parts.push(`Subject: ${input.subjectHint}`);

  if (input.lightingHint) {
    parts.push(`Lighting: ${input.lightingHint}`);
  }

  if (input.moodHint) {
    parts.push(`Mood: ${input.moodHint}`);
  }

  if (input.extraNotes) {
    parts.push(input.extraNotes);
  }

  parts.push(style.safetyPrompt);
  parts.push('OUTPUT: High resolution, clean artwork, no watermarks, no text overlays, no artifacts, no warped eyes, no extra limbs.');

  const fullPrompt = parts.join('\n\n').trim();

  return {
    styleId: style.id,
    fullPrompt,
    negativePrompt: style.negativePrompt
  };
}

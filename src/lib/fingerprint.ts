// Device fingerprinting utility for TeeFeeMe-5000
// Creates a unique hash based on device characteristics

export interface DeviceFingerprint {
  hash: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  userAgent: string;
  colorDepth: number;
  hardwareConcurrency: number;
  deviceMemory: number | undefined;
  touchSupport: boolean;
  webglVendor: string;
  webglRenderer: string;
  canvasHash: string;
}

// Simple hash function
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Get WebGL info
function getWebGLInfo(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        return {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'unknown',
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown'
        };
      }
    }
  } catch (e) {
    console.log('WebGL not available');
  }
  return { vendor: 'unknown', renderer: 'unknown' };
}

// Generate canvas fingerprint
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('TeeFeeMe5000', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('TeeFeeMe5000', 4, 17);
      return simpleHash(canvas.toDataURL());
    }
  } catch (e) {
    console.log('Canvas fingerprint failed');
  }
  return 'no-canvas';
}

// Generate the full device fingerprint
export async function generateFingerprint(): Promise<DeviceFingerprint> {
  const webglInfo = getWebGLInfo();
  const canvasHash = getCanvasFingerprint();
  
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  const colorDepth = window.screen.colorDepth;
  const hardwareConcurrency = navigator.hardwareConcurrency || 0;
  const deviceMemory = (navigator as any).deviceMemory;
  const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Combine all factors into a unique string
  const fingerprintData = [
    screenResolution,
    timezone,
    language,
    platform,
    colorDepth.toString(),
    hardwareConcurrency.toString(),
    deviceMemory?.toString() || 'unknown',
    touchSupport.toString(),
    webglInfo.vendor,
    webglInfo.renderer,
    canvasHash
  ].join('|');

  const hash = simpleHash(fingerprintData) + '-' + simpleHash(userAgent);

  return {
    hash,
    screenResolution,
    timezone,
    language,
    platform,
    userAgent,
    colorDepth,
    hardwareConcurrency,
    deviceMemory,
    touchSupport,
    webglVendor: webglInfo.vendor,
    webglRenderer: webglInfo.renderer,
    canvasHash
  };
}

// Get or create fingerprint (cached in sessionStorage)
export async function getFingerprint(): Promise<DeviceFingerprint> {
  const cached = sessionStorage.getItem('tfm5k_fingerprint');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Invalid cache, regenerate
    }
  }
  
  const fingerprint = await generateFingerprint();
  sessionStorage.setItem('tfm5k_fingerprint', JSON.stringify(fingerprint));
  return fingerprint;
}

// Get geolocation if available
export async function getGeolocation(): Promise<{ latitude: number; longitude: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        resolve(null);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
}

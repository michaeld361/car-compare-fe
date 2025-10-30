import { DetectedCar } from '../types';
import { competitorDatabase } from '../data/carModels';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_CAR_DETECTION_API_URL || 'http://127.0.0.1:8787';
const DETECTION_DELAY = parseInt(import.meta.env.VITE_DETECTION_DELAY || '2000', 10);

/**
 * Delay utility for camera stabilization
 * @param ms - Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Detects car using blob with the CarNET API
 * Matches the original HTML implementation exactly
 */
export async function detectCarFromBlob(
  blob: Blob,
  delayMs: number = DETECTION_DELAY
): Promise<DetectedCar | null> {
  try {
    if (!blob || !blob.size) {
      throw new Error('Failed to capture image.');
    }

    // Wait for delay (camera stabilization)
    console.log(`Waiting ${delayMs}ms before detection...`);
    await delay(delayMs);

    // Common box parameters (matches original HTML)
    const commonBoxParams = {
      box_select: 'largest',
      box_min_height: '60',
      box_min_width: '60',
      box_min_ratio: '0.5',
      box_max_ratio: '4',
      box_offset: '0'
    };

    // Multiple attempts with fallbacks (matches original HTML)
    const attempts = [
      { features: 'mmg,color', region: 'EU', ...commonBoxParams },
      { features: 'mm,color', region: 'EU', ...commonBoxParams },
      { features: 'mm', region: 'DEF', ...commonBoxParams }
    ];

    const detected = await tryDetectWithFallback(blob, attempts);

    if (!detected || !detected.make || /unknown/i.test(detected.make)) {
      throw new Error('No make/model detected after fallbacks.');
    }

    return detected;
  } catch (error) {
    console.error('Error detecting car:', error);
    throw error;
  }
}

/**
 * Try detection with multiple fallback parameter sets
 */
async function tryDetectWithFallback(
  blob: Blob,
  attemptList: any[]
): Promise<DetectedCar | null> {
  let lastError: Error | null = null;

  for (const params of attemptList) {
    try {
      const qs = new URLSearchParams(params);
      const requestUrl = `${API_URL}/recognize?${qs}`;

      console.group('🚗 CarNET API Request');
      console.log('📍 Endpoint:', requestUrl);
      console.log('📦 Image blob size:', blob.size, 'bytes');
      console.log('🎯 Query parameters:', params);
      console.groupEnd();

      const form = new FormData();
      form.append('image', blob, 'frame.jpg');

      const t0 = performance.now();
      const response = await fetch(requestUrl, { method: 'POST', body: form });
      const t1 = performance.now();

      console.group('📡 CarNET API Response');
      console.log('✅ Status:', response.status, response.statusText);
      console.log('⏱️ Response time:', (t1 - t0).toFixed(2), 'ms');
      console.groupEnd();

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upstream ${response.status}: ${text}`);
      }

      const data = await response.json();
      if (data?.meta?.parameters) {
        console.log('🔧 Upstream parameters echo:', data.meta.parameters);
      }

      const parsed = parseCarNetResponse(data);
      if (parsed && parsed.make && !/unknown/i.test(parsed.make)) {
        return parsed;
      }

      lastError = new Error('Empty mm/mmg arrays or unselected box');
    } catch (err) {
      console.warn('Attempt failed with params:', params, err);
      lastError = err as Error;
    }
  }

  console.error('All attempts failed:', lastError);
  return null;
}

/**
 * Parse CarNET API response (matches original HTML)
 */
function parseCarNetResponse(data: any): DetectedCar | null {
  console.group('🔧 Parsing CarNET Response');

  if (!data || !Array.isArray(data.detections) || data.detections.length === 0) {
    console.error('❌ No detections found in response');
    console.groupEnd();
    return null;
  }

  const det = data.detections.find((d: any) => d?.status?.selected) || data.detections[0];

  if (det?.status && det.status.selected === false) {
    console.warn('⚠️ Box not selected by upstream:', det.status);
  }

  const topMm = Array.isArray(det.mm) && det.mm.length ? det.mm[0] : null;
  const topMmg = Array.isArray(det.mmg) && det.mmg.length ? det.mmg[0] : null;

  const source = topMm || topMmg || null;
  if (!source) {
    console.warn('ℹ️ No mm/mmg candidates present.');
    console.groupEnd();
    return {
      make: 'Unknown',
      model: 'Unknown Model',
      year: '',
      confidence: 0,
      specs: {}
    };
  }

  const make = source.make_name || 'Unknown';
  const model = source.model_name || 'Unknown Model';
  const year = topMmg?.years || '';
  const conf = source.probability ?? 0;

  console.log('✅ Extracted values:', { make, model, year, confidence: conf });
  console.groupEnd();

  // Try to find specs in competitor database
  const carKey = `${make} ${model}`.trim();
  const competitor = competitorDatabase[carKey as keyof typeof competitorDatabase];

  return {
    make,
    model,
    year,
    confidence: Math.round(conf * 100),
    specs: competitor ? {
      horsepower: competitor.horsepower,
      torque: 0,
      acceleration: competitor.acceleration,
      mpg: competitor.mpgCombined,
      fuelType: 'Petrol',
      seating: competitor.seating,
      cargo: competitor.cargoVolume || 0
    } : {}
  };
}

/**
 * Wrapper for backward compatibility
 */
export async function detectCar(
  imageElement: HTMLImageElement | HTMLVideoElement,
  delayMs: number = DETECTION_DELAY
): Promise<DetectedCar | null> {
  // Convert image element to blob
  const blob = await imageElementToBlob(imageElement);
  return detectCarFromBlob(blob, delayMs);
}

/**
 * Convert image element to blob
 */
async function imageElementToBlob(
  imageElement: HTMLImageElement | HTMLVideoElement
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageElement instanceof HTMLVideoElement
      ? imageElement.videoWidth
      : imageElement.width;
    canvas.height = imageElement instanceof HTMLVideoElement
      ? imageElement.videoHeight
      : imageElement.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    ctx.drawImage(imageElement, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert image to blob'));
        }
      },
      'image/jpeg',
      0.85
    );
  });
}

/**
 * Continuous car detection with delay between attempts
 * Useful for live camera feed
 * @param videoElement - The video element to analyze
 * @param onDetection - Callback when car is detected
 * @param intervalMs - Interval between detection attempts (default: 3000ms)
 * @param detectionDelayMs - Delay before each detection starts (default: 2000ms)
 * @returns Stop function to cancel continuous detection
 */
export function startContinuousDetection(
  videoElement: HTMLVideoElement,
  onDetection: (car: DetectedCar | null) => void,
  intervalMs: number = 3000,
  detectionDelayMs: number = DETECTION_DELAY
): () => void {
  let isRunning = true;
  let timeoutId: number;

  const detect = async () => {
    if (!isRunning) return;

    try {
      const result = await detectCar(videoElement, detectionDelayMs);
      onDetection(result);
    } catch (error) {
      console.error('Detection error:', error);
      onDetection(null);
    }

    if (isRunning) {
      timeoutId = window.setTimeout(detect, intervalMs);
    }
  };

  // Start first detection
  detect();

  // Return stop function
  return () => {
    isRunning = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}

/**
 * Test API connection
 */
export async function testApiConnection(): Promise<boolean> {
  try {
    console.log(`Testing API connection to ${API_URL}...`);
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
    });
    
    if (response.ok) {
      console.log('API connection successful!');
      return true;
    } else {
      console.warn('API responded but with error:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Cannot connect to API:', error);
    return false;
  }
}

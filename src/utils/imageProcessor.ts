import heic2any from 'heic2any';

/**
 * Converts HEIC images to JPG and ensures all images are in JPG format
 * @param file - The image file to process
 * @returns Promise with the converted JPG blob
 */
export async function convertToJPG(file: File | Blob): Promise<Blob> {
  // Check if it's a HEIC file
  const isHEIC = file.type === 'image/heic' || 
                 file.type === 'image/heif' || 
                 (file instanceof File && (
                   file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif')
                 ));

  if (isHEIC) {
    console.log('Converting HEIC to JPG...');
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9
      });
      
      // heic2any can return an array of blobs, we want the first one
      return Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    } catch (error) {
      console.error('Error converting HEIC:', error);
      throw new Error('Failed to convert HEIC image to JPG');
    }
  }

  // If it's already a JPG, return as is
  if (file.type === 'image/jpeg') {
    return file;
  }

  // For other image formats (PNG, WebP, etc), convert to JPG
  return await convertImageToJPG(file);
}

/**
 * Converts any image format to JPG using canvas
 * @param blob - The image blob to convert
 * @returns Promise with the JPG blob
 */
async function convertImageToJPG(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (jpgBlob) => {
          if (jpgBlob) {
            resolve(jpgBlob);
          } else {
            reject(new Error('Failed to convert image to JPG'));
          }
        },
        'image/jpeg',
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Captures image from video stream and converts to JPG
 * @param videoElement - The video element to capture from
 * @returns Promise with the JPG blob
 */
export async function captureVideoFrameAsJPG(
  videoElement: HTMLVideoElement
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    ctx.drawImage(videoElement, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to capture video frame'));
        }
      },
      'image/jpeg',
      0.9
    );
  });
}

/**
 * Resizes image if it's too large (for better processing)
 * @param blob - The image blob to resize
 * @param maxWidth - Maximum width (default: 1920)
 * @param maxHeight - Maximum height (default: 1080)
 * @returns Promise with the resized JPG blob
 */
export async function resizeImage(
  blob: Blob,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (resizedBlob) => {
          if (resizedBlob) {
            resolve(resizedBlob);
          } else {
            reject(new Error('Failed to resize image'));
          }
        },
        'image/jpeg',
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for resizing'));
    };

    img.src = url;
  });
}

/**
 * Processes uploaded or captured image: converts to JPG and resizes if needed
 * @param file - The image file to process
 * @returns Promise with the processed JPG blob
 */
export async function processImage(file: File | Blob): Promise<Blob> {
  try {
    // Step 1: Convert to JPG (handles HEIC)
    const jpgBlob = await convertToJPG(file);

    // Step 2: Resize if necessary
    const processedBlob = await resizeImage(jpgBlob);

    console.log('Image processed successfully:', {
      originalType: file.type,
      processedType: processedBlob.type,
      processedSize: `${(processedBlob.size / 1024).toFixed(2)} KB`
    });

    return processedBlob;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

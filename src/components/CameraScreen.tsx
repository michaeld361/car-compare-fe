import { useState, useRef, useEffect } from 'react';
import { DetectedCar } from '../types';
import { processImage, captureVideoFrameAsJPG } from '../utils/imageProcessor';
import styles from './CameraScreen.module.css';

interface CameraScreenProps {
  onCarDetected: (car: DetectedCar) => void;
  onBack: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onCarDetected, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showTargetFrame, setShowTargetFrame] = useState(false);
  const [detectionProgress, setDetectionProgress] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStream(stream);
      
      // Show target frame after camera initializes
      setTimeout(() => {
        setShowTargetFrame(true);
      }, 500);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    setIsScanning(true);
    setDetectionProgress('Capturing image...');

    try {
      // Capture video frame and convert to JPG
      const jpgBlob = await captureVideoFrameAsJPG(videoRef.current);
      
      setDetectionProgress('Analyzing vehicle...');
      
      // Detect car directly from blob (no delay here, handled in detectCarFromBlob)
      const { detectCarFromBlob } = await import('../utils/carDetection');
      const detected = await detectCarFromBlob(jpgBlob, 3000);
      
      if (detected) {
        // Create thumbnail from the JPG blob
        const thumbnailUrl = URL.createObjectURL(jpgBlob);
        detected.thumbnail = thumbnailUrl;
        onCarDetected(detected);
      } else {
        alert('No car detected in the image. Please try again with a clearer view of the vehicle.');
        setIsScanning(false);
        setDetectionProgress('');
      }
    } catch (error: any) {
      console.error('Detection error:', error);
      
      if (error.message.includes('Cannot connect to car detection API')) {
        alert('Cannot connect to the car detection API. Please make sure the API is running at http://127.0.0.1:8787');
      } else if (error.message.includes('No make/model detected')) {
        alert('No car detected in the image. Please try again with a clearer view of a vehicle.');
      } else {
        alert('Error during detection: ' + (error.message || 'Unknown error'));
      }
      
      setIsScanning(false);
      setDetectionProgress('');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setDetectionProgress('Processing uploaded image...');

    try {
      // Process image (converts HEIC to JPG if needed)
      const processedBlob = await processImage(file);
      
      setDetectionProgress('Analyzing vehicle...');

      // Detect car directly from blob
      const { detectCarFromBlob } = await import('../utils/carDetection');
      const detected = await detectCarFromBlob(processedBlob, 2000);
      
      if (detected) {
        // Create thumbnail from the processed blob
        const thumbnailUrl = URL.createObjectURL(processedBlob);
        detected.thumbnail = thumbnailUrl;
        onCarDetected(detected);
      } else {
        alert('No car detected in the uploaded image. Please try another image with a clear view of a vehicle.');
        setIsScanning(false);
        setDetectionProgress('');
      }
    } catch (error: any) {
      console.error('Detection error:', error);
      
      if (error.message.includes('Cannot connect to car detection API')) {
        alert('Cannot connect to the car detection API. Please make sure the API is running at http://127.0.0.1:8787');
      } else if (error.message.includes('No make/model detected')) {
        alert('No car detected in the uploaded image. Please try another image with a clear view of a vehicle.');
      } else if (error.message.includes('Failed to convert HEIC')) {
        alert('Error processing HEIC image. Please try converting it to JPG first, or use a different image.');
      } else {
        alert('Error during detection: ' + (error.message || 'Unknown error'));
      }
      
      setIsScanning(false);
      setDetectionProgress('');
    }
  };

  return (
    <div className={styles.cameraScreen}>
      <div className={styles.logoBar}>
        <svg className="logo" width="70" height="51" viewBox="0 0 108 51" fill="none">
          <path d="M53.7843 1.32572C28.8513 1.32572 8.75219 11.5568 8.75219 23.8515C8.75219 30.8202 16.9563 36.2672 29.3761 39.2875L51.0729 13.7933H53.7843L35.0087 51C14.5656 47.3917 0 38.0021 0 26.5721C0 11.8739 24.0933 0 53.7843 0C83.4752 0 107.569 11.8739 107.569 26.5721C107.569 38.0021 93.0029 47.3917 72.5598 51L53.7843 13.7933H56.4956L78.1866 39.2875C90.6122 36.2672 98.8105 30.8202 98.8105 23.8515C98.8105 11.5568 78.7114 1.32572 53.7784 1.32572H53.7843Z" fill="white"/>
        </svg>
      </div>

      <div className={styles.cameraContainer}>
        <video
          ref={videoRef}
          className={styles.cameraFeed}
          autoPlay
          playsInline
          muted
        />

        <div className={styles.cameraOverlay}>
          <div className={styles.cameraInstructions}>
            Point your camera at a competitor's vehicle and tap the camera button
          </div>

          {showTargetFrame && !isScanning && (
            <div className={styles.targetFrame}>
              <div className={`${styles.targetCorners} ${styles.cornerTl}`} />
              <div className={`${styles.targetCorners} ${styles.cornerTr}`} />
              <div className={`${styles.targetCorners} ${styles.cornerBl}`} />
              <div className={`${styles.targetCorners} ${styles.cornerBr}`} />
            </div>
          )}

          {isScanning && (
            <div className={styles.scanningIndicator}>
              <div className={styles.spinner} />
              <span>{detectionProgress}</span>
            </div>
          )}
        </div>

        <div className={styles.cameraControls}>
          <button
            className={styles.iconBtn}
            onClick={onBack}
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            aria-label="Upload image"
          >
            <svg viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </button>

          <button
            className={`${styles.iconBtn} ${styles.captureBtn}`}
            onClick={handleCapture}
            disabled={isScanning}
            aria-label="Capture photo"
          >
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default CameraScreen;

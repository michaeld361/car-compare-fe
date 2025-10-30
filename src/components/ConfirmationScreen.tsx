import { DetectedCar } from '../types';
import styles from './ConfirmationScreen.module.css';

interface ConfirmationScreenProps {
  detectedCar: DetectedCar;
  onConfirm: () => void;
  onRetake: () => void;
  onBack: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  detectedCar,
  onConfirm,
  onRetake,
  onBack
}) => {
  return (
    <div className={styles.confirmationScreen}>
      <div className={styles.logoBar} onClick={onBack}>
        <svg className={styles.logo} viewBox="0 0 55 55" fill="currentColor">
          <path d="M27.5 0L0 15.714v23.572L27.5 55l27.5-15.714V15.714L27.5 0zm0 6.429l21.786 12.428v18.286L27.5 49.571 5.714 37.143V18.857L27.5 6.429z" />
        </svg>
      </div>

      <div className={styles.confirmationContent}>
        <h1 className={styles.title}>Is this your car?</h1>

        <div className={styles.detectedCarCard}>
          <div className={styles.detectedThumbnailCircle}>
            {detectedCar.make[0]}
          </div>
          <div className={styles.detectedInfo}>
            <h2>{detectedCar.make} {detectedCar.model}</h2>
            <div className={styles.detectedYear}>{detectedCar.year}</div>
            <div className={styles.confidence}>
              Confidence: {detectedCar.confidence}%
            </div>
          </div>
        </div>

        <div className={styles.confirmationActions}>
          <button className={styles.backArrowBtn} onClick={onRetake} aria-label="Retake photo">
            <svg viewBox="0 0 24 24">
              <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z" />
            </svg>
          </button>

          <button className={styles.button} onClick={onConfirm}>
            <span>Yes, Compare Now</span>
            <span className={styles.chevron} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

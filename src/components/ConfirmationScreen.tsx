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
            <svg className="logo" width="70" height="51" viewBox="0 0 108 51" fill="none">
      <path d="M53.7843 1.32572C28.8513 1.32572 8.75219 11.5568 8.75219 23.8515C8.75219 30.8202 16.9563 36.2672 29.3761 39.2875L51.0729 13.7933H53.7843L35.0087 51C14.5656 47.3917 0 38.0021 0 26.5721C0 11.8739 24.0933 0 53.7843 0C83.4752 0 107.569 11.8739 107.569 26.5721C107.569 38.0021 93.0029 47.3917 72.5598 51L53.7843 13.7933H56.4956L78.1866 39.2875C90.6122 36.2672 98.8105 30.8202 98.8105 23.8515C98.8105 11.5568 78.7114 1.32572 53.7784 1.32572H53.7843Z" fill="white"/>
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

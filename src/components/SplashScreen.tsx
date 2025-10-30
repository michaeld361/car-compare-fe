import { useState } from 'react';
import { CarModel } from '../types';
import { infinitiModels } from '../data/carModels';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  selectedModel: CarModel | null;
  onModelSelect: (model: CarModel) => void;
  onStartCamera: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  selectedModel,
  onModelSelect,
  onStartCamera
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleModelClick = (model: CarModel) => {
    onModelSelect(model);
    setIsButtonEnabled(true);
  };

  return (
    <div className={styles.splashScreen}>
      <div className={styles.logoBar}>
        <svg className={styles.logo} viewBox="0 0 55 55" fill="currentColor">
          <path d="M27.5 0L0 15.714v23.572L27.5 55l27.5-15.714V15.714L27.5 0zm0 6.429l21.786 12.428v18.286L27.5 49.571 5.714 37.143V18.857L27.5 6.429z" />
        </svg>
      </div>

      <div className={styles.splashContent}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Compare Your Car Against INFINITI's Finest</h1>
          <p className={styles.bodyCopy}>
            Select one of our models, then aim your camera at a competitor. We'll show you why INFINITI stands apart.
          </p>

          <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
              <div className={styles.carousel}>
                {infinitiModels.map((model) => (
                  <div key={model.id} className={styles.galleryItemWrapper}>
                    <button
                      className={`${styles.galleryCircleButton} ${
                        selectedModel?.id === model.id ? styles.selected : ''
                      }`}
                      onClick={() => handleModelClick(model)}
                      aria-label={`Select ${model.name}`}
                    >
                      <div
                        className={styles.carImagePlaceholder}
                        style={{ backgroundImage: `url(${model.image})` }}
                      />
                    </button>
                    <div className={styles.galleryLabel}>{model.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.button} ${!isButtonEnabled ? styles.pulseAnimate : ''}`}
            onClick={onStartCamera}
            disabled={!isButtonEnabled}
          >
            <span>
              {isButtonEnabled ? 'Start AR Comparison' : 'Select a Model to Continue'}
            </span>
            <span className={styles.chevron} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

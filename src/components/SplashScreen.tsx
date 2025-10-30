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
            <svg className="logo" width="70" height="51" viewBox="0 0 108 51" fill="none">
      <path d="M53.7843 1.32572C28.8513 1.32572 8.75219 11.5568 8.75219 23.8515C8.75219 30.8202 16.9563 36.2672 29.3761 39.2875L51.0729 13.7933H53.7843L35.0087 51C14.5656 47.3917 0 38.0021 0 26.5721C0 11.8739 24.0933 0 53.7843 0C83.4752 0 107.569 11.8739 107.569 26.5721C107.569 38.0021 93.0029 47.3917 72.5598 51L53.7843 13.7933H56.4956L78.1866 39.2875C90.6122 36.2672 98.8105 30.8202 98.8105 23.8515C98.8105 11.5568 78.7114 1.32572 53.7784 1.32572H53.7843Z" fill="white"/>
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

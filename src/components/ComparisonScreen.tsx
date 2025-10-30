import { CarModel, DetectedCar } from '../types';
import styles from './ComparisonScreen.module.css';

interface ComparisonScreenProps {
  infinitiModel: CarModel;
  detectedCar: DetectedCar;
  onBack: () => void;
}

const ComparisonScreen: React.FC<ComparisonScreenProps> = ({
  infinitiModel,
  detectedCar,
  onBack
}) => {
  const renderComparisonCards = () => {
    const cards: JSX.Element[] = [];
    const infiniti = infinitiModel;
    const competitor = detectedCar.specs;
    const infinitiName = infiniti.name;
    const competitorName = `${detectedCar.make} ${detectedCar.model}`;

    // Performance comparison
    if (infiniti.performance.horsepower > (competitor.horsepower || 0)) {
      cards.push(
        <div key="performance" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Raw Power Under the Hood</div>
          <div className={styles.comparisonText}>
            The {infinitiName} delivers <b>{infiniti.performance.horsepower} hp</b>, 
            outpacing the {competitorName}'s {competitor.horsepower || 'N/A'} hp.
          </div>
          <div className={styles.statComparison}>
            <div>
              <div className={styles.statLabel}>{infinitiName}</div>
              <div className={`${styles.statValue} ${styles.infinitiValue}`}>
                {infiniti.performance.horsepower} hp
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.statLabel}>{competitorName}</div>
              <div className={styles.statValue}>{competitor.horsepower || 'N/A'} hp</div>
            </div>
          </div>
        </div>
      );
    }

    // Acceleration comparison
    if (infiniti.performance.acceleration < (competitor.acceleration || 999)) {
      cards.push(
        <div key="acceleration" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Lightning Quick Acceleration</div>
          <div className={styles.comparisonText}>
            {infinitiName} hits 0-60 mph in just <b>{infiniti.performance.acceleration}s</b>, 
            quicker than {competitorName}'s {competitor.acceleration || 'N/A'}s.
          </div>
          <div className={styles.statComparison}>
            <div>
              <div className={styles.statLabel}>{infinitiName}</div>
              <div className={`${styles.statValue} ${styles.infinitiValue}`}>
                {infiniti.performance.acceleration}s
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.statLabel}>{competitorName}</div>
              <div className={styles.statValue}>{competitor.acceleration || 'N/A'}s</div>
            </div>
          </div>
        </div>
      );
    }

    // Efficiency comparison
    if (infiniti.efficiency.mpg > (competitor.mpg || 0)) {
      cards.push(
        <div key="efficiency" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Efficiency Meets Performance</div>
          <div className={styles.comparisonText}>
            {infinitiName} achieves <b>{infiniti.efficiency.mpg} MPG</b>, 
            more efficient than {competitorName}'s {competitor.mpg || 'N/A'} MPG.
          </div>
          <div className={styles.statComparison}>
            <div>
              <div className={styles.statLabel}>{infinitiName}</div>
              <div className={`${styles.statValue} ${styles.infinitiValue}`}>
                {infiniti.efficiency.mpg} MPG
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.statLabel}>{competitorName}</div>
              <div className={styles.statValue}>{competitor.mpg || 'N/A'} MPG</div>
            </div>
          </div>
        </div>
      );
    }

    // Technology features
    if (infiniti.technology.length > 0) {
      cards.push(
        <div key="technology" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Advanced Technology</div>
          <div className={styles.comparisonText}>
            {infinitiName} comes equipped with:
          </div>
          <ul className={styles.featureList}>
            {infiniti.technology.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Cargo space comparison
    if (infiniti.cargo > (competitor.cargo || 0)) {
      cards.push(
        <div key="cargo" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Room for Everything</div>
          <div className={styles.comparisonText}>
            {infinitiName} offers <b>{infiniti.cargo}L</b> of cargo space, 
            more than {competitorName}'s {competitor.cargo || 'N/A'}L.
          </div>
          <div className={styles.statComparison}>
            <div>
              <div className={styles.statLabel}>{infinitiName}</div>
              <div className={`${styles.statValue} ${styles.infinitiValue}`}>
                {infiniti.cargo}L
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.statLabel}>{competitorName}</div>
              <div className={styles.statValue}>{competitor.cargo || 'N/A'}L</div>
            </div>
          </div>
        </div>
      );
    }

    // Seating comparison
    if (infiniti.seating >= 7 && infiniti.seating > (competitor.seating || 5)) {
      cards.push(
        <div key="seating" className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>Seats for the Whole Squad</div>
          <div className={styles.comparisonText}>
            {infinitiName} seats <b>{infiniti.seating}</b> people comfortably, 
            more than {competitorName}'s {competitor.seating || 5} seats.
          </div>
          <div className={styles.statComparison}>
            <div>
              <div className={styles.statLabel}>{infinitiName}</div>
              <div className={`${styles.statValue} ${styles.infinitiValue}`}>
                {infiniti.seating} seats
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.statLabel}>{competitorName}</div>
              <div className={styles.statValue}>{competitor.seating || 5} seats</div>
            </div>
          </div>
        </div>
      );
    }

    // CTA Card
    cards.push(
      <div key="cta" className={`${styles.comparisonCard} ${styles.ctaCard}`}>
        <div className={styles.testDriveIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
        </div>
        <div className={styles.comparisonTitle}>Fancy a Spin?</div>
        <div className={styles.comparisonText}>
          Book a test drive and experience how {infinitiName} handles the road.
        </div>
        <div className={styles.dealershipAddress}>
          INFINITI Centre London<br />
          145 Park Lane, Mayfair<br />
          London W1K 7AA<br />
          <span className={styles.dealershipPhone}>020 7123 4567</span>
        </div>
        <div className={styles.testDriveActions}>
          <a href="tel:02071234567" className={styles.actionIconBtn}>
            <svg viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Call
          </a>
          <a
            href="https://www.google.com/maps/search/INFINITI+Centre+London+145+Park+Lane"
            className={styles.actionIconBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Directions
          </a>
          <a
            href="https://www.infiniti.co.uk/find-a-retailer.html"
            className={styles.actionIconBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8z" />
            </svg>
            Website
          </a>
        </div>
      </div>
    );

    return cards;
  };

  return (
    <div className={styles.comparisonScreen}>
      <div className={styles.logoBar} onClick={onBack}>
        <svg className={styles.logo} viewBox="0 0 55 55" fill="currentColor">
          <path d="M27.5 0L0 15.714v23.572L27.5 55l27.5-15.714V15.714L27.5 0zm0 6.429l21.786 12.428v18.286L27.5 49.571 5.714 37.143V18.857L27.5 6.429z" />
        </svg>
      </div>

      <div className={styles.comparisonHeader}>
        <h1>How Does It Compare?</h1>
        <div className={styles.vsContainer}>
          <div className={styles.carThumbnail}>
            <div className={styles.carThumbnailCircle}>I</div>
            <div className={styles.carThumbnailName}>{infinitiModel.name}</div>
          </div>
          <div className={styles.vsBadge}>VS</div>
          <div className={styles.carThumbnail}>
            <div className={styles.carThumbnailCircle}>{detectedCar.make[0]}</div>
            <div className={styles.carThumbnailName}>
              {detectedCar.make} {detectedCar.model}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.comparisonGrid}>{renderComparisonCards()}</div>
    </div>
  );
};

export default ComparisonScreen;

import { CarModel } from '../types';

export const infinitiModels: CarModel[] = [
  {
    id: 'qx80',
    name: 'QX80',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    performance: {
      horsepower: 400,
      torque: 413,
      acceleration: 6.5
    },
    efficiency: {
      mpg: 16,
      fuelType: 'Petrol'
    },
    technology: [
      'ProPILOT Assist',
      'Around View Monitor',
      'Bose Performance Series Audio'
    ],
    dimensions: {
      length: 5290,
      width: 2030,
      height: 1925
    },
    seating: 7,
    cargo: 470
  },
  {
    id: 'qx60',
    name: 'QX60',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
    performance: {
      horsepower: 295,
      torque: 270,
      acceleration: 7.2
    },
    efficiency: {
      mpg: 24,
      fuelType: 'Petrol'
    },
    technology: [
      'ProPILOT Assist',
      'Tri-Zone Climate Control',
      'Wireless Apple CarPlay'
    ],
    dimensions: {
      length: 5034,
      width: 1981,
      height: 1742
    },
    seating: 7,
    cargo: 386
  },
  {
    id: 'qx55',
    name: 'QX55',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1552519507-cf9d0a4e4770?w=800&q=80',
    performance: {
      horsepower: 268,
      torque: 251,
      acceleration: 7.0
    },
    efficiency: {
      mpg: 25,
      fuelType: 'Petrol'
    },
    technology: [
      'ProACTIVE',
      'Head-Up Display',
      'Bose Premium Audio'
    ],
    dimensions: {
      length: 4678,
      width: 1903,
      height: 1594
    },
    seating: 5,
    cargo: 762
  },
  {
    id: 'q50',
    name: 'Q50',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    performance: {
      horsepower: 300,
      torque: 295,
      acceleration: 5.6
    },
    efficiency: {
      mpg: 27,
      fuelType: 'Petrol'
    },
    technology: [
      'Direct Adaptive Steering',
      'InTouch Dual Display',
      'Active Lane Control'
    ],
    dimensions: {
      length: 4783,
      width: 1823,
      height: 1445
    },
    seating: 5,
    cargo: 372
  }
];

// Mock competitor database for comparison - matches original HTML
export const competitorDatabase: Record<string, any> = {
  'BMW X4': { cargoVolume: 50.5, mpgCombined: 24, msrp: 56000, seating: 5, horsepower: 248, acceleration: 6.1, category: 'crossover_coupe' },
  'Mercedes GLC Coupe': { cargoVolume: 49.4, mpgCombined: 23, msrp: 58000, seating: 5, horsepower: 255, acceleration: 6.3, category: 'crossover_coupe' },
  'Audi Q5 Sportback': { cargoVolume: 53.1, mpgCombined: 24, msrp: 54000, seating: 5, horsepower: 261, acceleration: 5.9, category: 'crossover_coupe' },
  'BMW X6': { cargoVolume: 59.7, mpgCombined: 22, msrp: 68000, seating: 5, horsepower: 335, acceleration: 5.3, category: 'crossover_coupe' },
  'Acura MDX': { cargoVolume: 71.4, mpgCombined: 22, msrp: 50000, seating: 7, horsepower: 290, acceleration: 6.4, category: 'three_row' },
  'Audi Q7': { cargoVolume: 69.6, mpgCombined: 21, msrp: 59000, seating: 7, horsepower: 261, acceleration: 6.9, category: 'three_row' },
  'BMW X5': { cargoVolume: 72.3, mpgCombined: 23, msrp: 62000, seating: 7, horsepower: 335, acceleration: 5.5, category: 'three_row' },
  'Volvo XC90': { cargoVolume: 85.7, mpgCombined: 23, msrp: 58000, seating: 7, horsepower: 295, acceleration: 6.2, category: 'three_row' },
  'Lexus RX L': { cargoVolume: 58.5, mpgCombined: 24, msrp: 53000, seating: 7, horsepower: 295, acceleration: 7.2, category: 'three_row' },
  'Cadillac Escalade': { cargoVolume: 94.2, mpgCombined: 17, msrp: 82000, seating: 8, horsepower: 420, acceleration: 6.1, category: 'full_size' },
  'BMW X7': { cargoVolume: 90.4, mpgCombined: 21, msrp: 79000, seating: 7, horsepower: 335, acceleration: 6.1, category: 'full_size' },
  'Mercedes GLS': { cargoVolume: 84.7, mpgCombined: 20, msrp: 81000, seating: 7, horsepower: 362, acceleration: 5.9, category: 'full_size' },
  'Land Rover Range Rover': { cargoVolume: 68.6, mpgCombined: 19, msrp: 98000, seating: 7, horsepower: 395, acceleration: 5.4, category: 'full_size' },
  'Lincoln Navigator': { cargoVolume: 103.3, mpgCombined: 18, msrp: 83000, seating: 8, horsepower: 440, acceleration: 5.9, category: 'full_size' },
  'BMW 3 Series': { trunkVolume: 13.0, mpgCombined: 28, msrp: 44000, seating: 5, horsepower: 255, acceleration: 5.6, category: 'sport_sedan' },
  'Mercedes C-Class': { trunkVolume: 12.6, mpgCombined: 27, msrp: 45000, seating: 5, horsepower: 255, acceleration: 5.9, category: 'sport_sedan' },
  'Audi A4': { trunkVolume: 13.0, mpgCombined: 28, msrp: 40000, seating: 5, horsepower: 201, acceleration: 6.8, category: 'sport_sedan' },
  'Genesis G70': { trunkVolume: 10.5, mpgCombined: 25, msrp: 40000, seating: 5, horsepower: 252, acceleration: 6.0, category: 'sport_sedan' },
  'Lexus IS': { trunkVolume: 10.8, mpgCombined: 26, msrp: 41000, seating: 5, horsepower: 241, acceleration: 7.0, category: 'sport_sedan' },
  'BMW': { cargoVolume: 60.0, mpgCombined: 24, msrp: 58000, seating: 5, horsepower: 300, acceleration: 5.8, category: 'generic' },
  'Mercedes': { cargoVolume: 58.0, mpgCombined: 23, msrp: 60000, seating: 5, horsepower: 310, acceleration: 5.7, category: 'generic' },
  'Audi': { cargoVolume: 62.0, mpgCombined: 25, msrp: 56000, seating: 5, horsepower: 280, acceleration: 6.0, category: 'generic' },
  'Lexus': { cargoVolume: 55.0, mpgCombined: 26, msrp: 50000, seating: 5, horsepower: 295, acceleration: 6.5, category: 'generic' },
  'Acura': { cargoVolume: 68.0, mpgCombined: 23, msrp: 48000, seating: 7, horsepower: 290, acceleration: 6.3, category: 'generic' },
  'Volvo': { cargoVolume: 70.0, mpgCombined: 24, msrp: 54000, seating: 7, horsepower: 295, acceleration: 6.4, category: 'generic' },
  'Cadillac': { cargoVolume: 88.0, mpgCombined: 18, msrp: 78000, seating: 8, horsepower: 400, acceleration: 6.2, category: 'generic' },
  'Lincoln': { cargoVolume: 95.0, mpgCombined: 19, msrp: 80000, seating: 8, horsepower: 420, acceleration: 6.0, category: 'generic' },
  'Genesis': { cargoVolume: 12.0, mpgCombined: 26, msrp: 42000, seating: 5, horsepower: 260, acceleration: 6.2, category: 'generic' },
  'Land Rover': { cargoVolume: 70.0, mpgCombined: 20, msrp: 90000, seating: 7, horsepower: 380, acceleration: 5.8, category: 'generic' }
};

/**
 * Get competitor specs with fallback to dummy data
 * This ensures we ALWAYS have data for comparison
 */
export function getCompetitorSpecs(make: string, model: string): any {
  // Try exact match first (Make Model)
  const exactKey = `${make} ${model}`;
  if (competitorDatabase[exactKey]) {
    console.log(`✅ Found exact match for: ${exactKey}`);
    return competitorDatabase[exactKey];
  }

  // Try just the make
  if (competitorDatabase[make]) {
    console.log(`✅ Found make match for: ${make}`);
    return competitorDatabase[make];
  }

  // Generate realistic dummy data based on make
  console.log(`ℹ️ Generating dummy data for: ${make} ${model}`);
  return generateDummySpecs(make, model);
}

/**
 * Generate realistic dummy specs for any car
 */
function generateDummySpecs(make: string, model: string): any {
  // Luxury brands get higher specs
  const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Infiniti', 'Cadillac', 'Lincoln', 'Genesis', 'Porsche', 'Jaguar', 'Land Rover', 'Range Rover', 'Volvo'];
  const isLuxury = luxuryBrands.some(brand => make.toUpperCase().includes(brand.toUpperCase()));

  // Economy brands get lower specs
  //const economyBrands = ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Ford', 'Chevrolet', 'Dodge'];
  // const _isEconomy = economyBrands.some(brand => make.toUpperCase().includes(brand.toUpperCase()));

  // SUV/Crossover models (check model name)
  const isSUV = /X\d|Q\d|RX|GX|NX|UX|XT|CX|RAV|CR-V|PILOT|EXPLORER|TAHOE|SUBURBAN|YUKON|ESCALADE|NAVIGATOR|EXPEDITION/i.test(model);
  const isSedan = /\d\s?SERIES|\dSERIES|A\d|C\d|E\d|S\d|3|5|7|ACCORD|CAMRY|ALTIMA|SONATA|ELANTRA|CIVIC|COROLLA/i.test(model);

  let baseSpecs;

  if (isSUV) {
    baseSpecs = {
      cargoVolume: isLuxury ? 70 : 60,
      mpgCombined: isLuxury ? 22 : 26,
      msrp: isLuxury ? 60000 : 35000,
      seating: 7,
      horsepower: isLuxury ? 300 : 250,
      acceleration: isLuxury ? 6.0 : 7.5,
      category: 'suv'
    };
  } else if (isSedan) {
    baseSpecs = {
      trunkVolume: 13.0,
      mpgCombined: isLuxury ? 25 : 30,
      msrp: isLuxury ? 45000 : 28000,
      seating: 5,
      horsepower: isLuxury ? 280 : 200,
      acceleration: isLuxury ? 5.8 : 7.2,
      category: 'sedan'
    };
  } else {
    // Default to crossover
    baseSpecs = {
      cargoVolume: isLuxury ? 65 : 55,
      mpgCombined: isLuxury ? 23 : 27,
      msrp: isLuxury ? 55000 : 32000,
      seating: 5,
      horsepower: isLuxury ? 280 : 220,
      acceleration: isLuxury ? 6.5 : 7.8,
      category: 'crossover'
    };
  }

  // Add some variation (+/- 10%)
  const variation = 0.9 + Math.random() * 0.2;
  return {
    cargoVolume: Math.round((baseSpecs.cargoVolume || 60) * variation),
    mpgCombined: Math.round((baseSpecs.mpgCombined || 24) * variation),
    msrp: Math.round((baseSpecs.msrp || 50000) * variation),
    seating: baseSpecs.seating,
    horsepower: Math.round((baseSpecs.horsepower || 280) * variation),
    acceleration: parseFloat(((baseSpecs.acceleration || 6.5) * variation).toFixed(1)),
    category: baseSpecs.category,
    trunkVolume: baseSpecs.trunkVolume
  };
}

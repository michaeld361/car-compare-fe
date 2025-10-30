export interface CarModel {
  id: string;
  name: string;
  year: string;
  image: string;
  performance: {
    horsepower: number;
    torque: number;
    acceleration: number;
  };
  efficiency: {
    mpg: number;
    fuelType: string;
  };
  technology: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  seating: number;
  cargo: number;
}

export interface DetectedCar {
  make: string;
  model: string;
  year: string;
  confidence: number;
  thumbnail?: string;
  specs: {
    horsepower?: number;
    torque?: number;
    acceleration?: number;
    mpg?: number;
    fuelType?: string;
    length?: number;
    width?: number;
    height?: number;
    seating?: number;
    cargo?: number;
  };
}

export interface AppState {
  selectedInfinitiModel: CarModel | null;
  detectedCar: DetectedCar | null;
  currentScreen: 'splash' | 'camera' | 'confirmation' | 'comparison';
}

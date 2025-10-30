import { useState, useEffect } from 'react';
import { AppState, CarModel, DetectedCar } from './types';
import { testApiConnection } from './utils/carDetection';
import SplashScreen from './components/SplashScreen';
import CameraScreen from './components/CameraScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ComparisonScreen from './components/ComparisonScreen';
import './styles/global.css';

function App() {
  const [appState, setAppState] = useState<AppState>({
    selectedInfinitiModel: null,
    detectedCar: null,
    currentScreen: 'splash'
  });

  // Test API connection on app start
  useEffect(() => {
    testApiConnection().then(connected => {
      if (!connected) {
        console.warn('Warning: Car detection API is not responding. Make sure it is running at the configured endpoint.');
      }
    });
  }, []);

  const handleModelSelect = (model: CarModel) => {
    setAppState(prev => ({
      ...prev,
      selectedInfinitiModel: model
    }));
  };

  const handleStartCamera = () => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'camera'
    }));
  };

  const handleCarDetected = (car: DetectedCar) => {
    setAppState(prev => ({
      ...prev,
      detectedCar: car,
      currentScreen: 'confirmation'
    }));
  };

  const handleConfirmDetection = () => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'comparison'
    }));
  };

  const handleRetake = () => {
    setAppState(prev => ({
      ...prev,
      detectedCar: null,
      currentScreen: 'camera'
    }));
  };

  const handleBackToHome = () => {
    setAppState({
      selectedInfinitiModel: null,
      detectedCar: null,
      currentScreen: 'splash'
    });
  };

  const handleBackFromCamera = () => {
    setAppState(prev => ({
      ...prev,
      detectedCar: null,
      currentScreen: 'splash'
    }));
  };

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            selectedModel={appState.selectedInfinitiModel}
            onModelSelect={handleModelSelect}
            onStartCamera={handleStartCamera}
          />
        );
      case 'camera':
        return (
          <CameraScreen
            onCarDetected={handleCarDetected}
            onBack={handleBackFromCamera}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen
            detectedCar={appState.detectedCar!}
            onConfirm={handleConfirmDetection}
            onRetake={handleRetake}
            onBack={handleBackToHome}
          />
        );
      case 'comparison':
        return (
          <ComparisonScreen
            infinitiModel={appState.selectedInfinitiModel!}
            detectedCar={appState.detectedCar!}
            onBack={handleBackToHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;

# Infiniti AR Car Compare

A modern React application for comparing Infiniti vehicles with competitors using augmented reality and AI-powered car detection.

## Features

- 🚗 **Interactive Car Selection** - Browse and select from Infiniti's latest models
- 📸 **Camera Integration** - Take photos of competitor vehicles in real-time
- 🤖 **AI Car Detection** - Automatic vehicle identification using TensorFlow.js
- 📱 **Image Upload Support** - Upload existing photos (supports HEIC/HEIF from iPhones)
- 🔄 **HEIC to JPG Conversion** - Automatic conversion of iPhone photos to JPG format
- ⏱️ **Stabilization Delay** - Configurable delay before detection for better accuracy
- 📊 **Side-by-Side Comparison** - Detailed feature and spec comparisons
- 🎨 **Modern UI/UX** - Smooth animations and responsive design
- 📍 **Dealership Integration** - Direct links to call, navigate, or visit Infiniti retailers

## Technology Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TensorFlow.js** - Machine learning in the browser
- **MobileNet** - Pre-trained model for image classification
- **heic2any** - HEIC to JPG conversion library
- **CSS Modules** - Scoped styling

## Prerequisites

- Node.js 18+ and npm/yarn
- A modern web browser with camera access
- HTTPS (required for camera access)

## Installation

1. **Clone or extract the project:**
   ```bash
   cd infiniti-ar-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Note:** For camera access, you may need to use HTTPS. You can use tools like:
- `local-ssl-proxy` for local HTTPS
- Deploy to a hosting service with HTTPS

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The build output will be in the `dist` directory.

## Project Structure

```
infiniti-ar-app/
├── src/
│   ├── components/           # React components
│   │   ├── SplashScreen.tsx
│   │   ├── SplashScreen.module.css
│   │   ├── CameraScreen.tsx
│   │   ├── CameraScreen.module.css
│   │   ├── ConfirmationScreen.tsx
│   │   ├── ConfirmationScreen.module.css
│   │   ├── ComparisonScreen.tsx
│   │   └── ComparisonScreen.module.css
│   ├── data/                 # Static data
│   │   └── carModels.ts      # Car model definitions
│   ├── utils/                # Utility functions
│   │   ├── carDetection.ts   # AI detection logic
│   │   └── imageProcessor.ts # Image conversion & processing
│   ├── styles/               # Global styles
│   │   └── global.css
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## Key Features Explained

### 1. Camera Detection with Delay

The app includes a configurable delay before starting car detection. This allows the camera to stabilize and improves detection accuracy.

```typescript
// Default delay: 3000ms (3 seconds)
const detected = await detectCar(imageElement, 3000);
```

You can adjust this delay in `src/components/CameraScreen.tsx` by changing the parameter in the `detectCar` function call.

### 2. HEIC to JPG Conversion

All images are automatically converted to JPG format, including HEIC files from iPhones:

- **Camera captures**: Automatically converted to JPG
- **File uploads**: Detected and converted if HEIC/HEIF
- **Resizing**: Large images are automatically resized for optimal processing

The conversion happens in `src/utils/imageProcessor.ts`:

```typescript
export async function convertToJPG(file: File | Blob): Promise<Blob>
export async function processImage(file: File | Blob): Promise<Blob>
```

### 3. AI Car Detection

The app uses TensorFlow.js with MobileNet for car detection:

1. Model loads on app startup (preload for faster detection)
2. Configurable delay before detection starts
3. Analyzes images for car-related classifications
4. Returns detected car information with confidence score

**Note:** In production, you should replace the mock detection with a real car recognition API that can identify specific makes and models.

### 4. Responsive Design

The app is fully responsive and works on:
- Mobile devices (phone cameras)
- Tablets
- Desktop computers (webcam or file upload)

## Configuration

### Adjusting Detection Delay

To change the delay before car detection starts, edit `src/components/CameraScreen.tsx`:

```typescript
// Line ~89 - For camera capture
const detected = await detectCar(img, 3000); // Change 3000 to your desired ms

// Line ~115 - For file upload
const detected = await detectCar(img, 2000); // Change 2000 to your desired ms
```

### Modifying Car Models

Update `src/data/carModels.ts` to add or modify Infiniti models:

```typescript
export const infinitiModels: CarModel[] = [
  {
    id: 'qx80',
    name: 'QX80',
    year: '2024',
    // ... other properties
  }
];
```

### Integrating Real Car Detection API

Replace the mock detection in `src/utils/carDetection.ts`:

```typescript
async function mockCarIdentification(
  prediction: { className: string; probability: number }
): Promise<DetectedCar> {
  // Replace this with your actual API call
  const response = await fetch('YOUR_CAR_DETECTION_API', {
    method: 'POST',
    body: imageBlob
  });
  
  return await response.json();
}
```

## Browser Compatibility

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

**Camera Requirements:**
- HTTPS connection (or localhost for development)
- Camera permissions granted by user
- Modern browser with getUserMedia API support

## Performance Optimization

The app includes several optimizations:

1. **Model Preloading**: TensorFlow model loads on app start
2. **Image Compression**: Images are resized to optimal dimensions
3. **CSS Modules**: Scoped styles prevent conflicts
4. **Code Splitting**: Automatic chunk splitting by Vite
5. **Lazy Loading**: Components load as needed

## Troubleshooting

### Camera Not Working

1. Ensure you're using HTTPS (or localhost)
2. Check browser camera permissions
3. Try a different browser
4. Check if another app is using the camera

### HEIC Files Not Converting

1. Check that `heic2any` is installed: `npm install heic2any`
2. Ensure the file is actually HEIC format
3. Check browser console for errors

### Detection Not Working

1. Ensure good lighting
2. Center the car in the frame
3. Wait for the stabilization delay to complete
4. Try with a different image

### Build Errors

1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Clear Vite cache: `rm -rf node_modules/.vite`
4. Rebuild: `npm run build`

## Deployment

### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import your Git repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Other Platforms

Build the app and deploy the `dist` folder to any static hosting service.

## Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_API_URL=https://your-car-detection-api.com
VITE_DETECTION_DELAY=3000
```

Access in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Infiniti.

## Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Contact the development team

## Acknowledgments

- Infiniti for the brand and vehicle data
- TensorFlow.js team for machine learning tools
- React and Vite communities for excellent tooling

---

**Built with ❤️ for Infiniti**

import "dotenv/config";

/**
 * This is the main configuration file for the Expo application.
 * It defines metadata like the app name, version, icons, and splash screens.
 * Crucially, the `extra` field is used to expose environment variables
 * (like the GOOGLE_API_KEY from the .env file) to the application at build time.
 */
export default {
  expo: {
    name: "Choff",
    slug: "choff",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/choffLogo4.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/choffLogo4.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.robertmoran.choff",
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["@react-native-firebase/app", "@react-native-firebase/crashlytics"],
    extra: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: "7c803c00-aa50-4330-8699-f0b33f315c8c",
      },
    },
  },
};

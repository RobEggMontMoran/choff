# Choff - A Home Barista Application

Choff is a mobile application built with React Native and Expo, designed for home espresso enthusiasts. It allows users to log detailed information about their coffee beans and brews, track key variables like dose and yield, and review tasting feedback to improve their technique over time.

## Key Features

- **Secure User Authentication:** Full user registration and login system with persistent sessions.
- **Bean & Brew Journal:** Full CRUD (Create, Read, Update, Delete) functionality for a personal library of beans and a detailed brew history.
- **Data Security:** User data is protected by server-side Firebase Security Rules, ensuring users can only ever access their own information.
- **Image Uploads:** Users can upload photos for each bean and brew, which are stored securely in Firebase Storage.
- **Integrated Brew Timer:** An accurate, in-app stopwatch for timing espresso shots.
- **Dynamic Search & Sort:** High-performance, client-side search and sort functionality to easily manage large libraries of data.
- **AI Barista Assistant:** Provides AI-driven suggestions (via the Gemini API) to help users refine their brew parameters based on their logged data. _(Note: This feature is demonstrated in the project's video demo)._

## Technology Stack

- **Frontend:** React Native (with Expo SDK)
- **Backend & Database:** Firebase (Authentication, Firestore, Storage)
- **UI Library:** React Native Paper (Material Design 3)
- **Navigation:** React Navigation (Stack)
- **Version Control:** Git & GitHub
- **Build Service:** Expo Application Services (EAS Build)

## How to Install and Run the Application

This application is intended to be run as a standalone Android package (`.apk`).

1.  **Download the APK file:**
    - XXX XXX XXX

2.  **Transfer the `.apk` file** to your Android phone (e.g., via a USB cable or by downloading it directly on the device).

3.  **Enable "Install from unknown sources"** on your phone. On most Android devices, this can be found in `Settings > Security`. You may be prompted to do this automatically when you first try to open the file.

4.  **Install the app.** Locate the `.apk` file in your phone's file manager and tap on it to begin the installation. Once complete, the Choff app icon will appear on your home screen or in your app drawer.

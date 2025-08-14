import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/StackNavigator";
import { Provider as PaperProvider } from "react-native-paper"; // provider for react native paper
import { enGB, registerTranslation } from "react-native-paper-dates";

registerTranslation("en-GB", enGB);

const App = () => {
  return (
    // entire app wrapped in provider
    <PaperProvider>
      <StatusBar style="auto" />
      <StackNavigator />
    </PaperProvider>
  );
};

export default App;

// // Test Firestore write used to verify successful Firebase integration
// // Retained here for reference or future debugging if needed

// import { useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
// import StackNavigator from "./navigation/StackNavigator";
// import { collection, addDoc } from "firebase/firestore";
// import db from "./src/firebase/firestore";

// const App = () => {
//   useEffect(() => {
//     const testWrite = async () => {
//       try {
//         const docRef = await addDoc(collection(db, "debugTest"), {
//           message: "Firebase setup successful",
//           timestamp: new Date().toISOString(),
//         });
//         console.log("Test Firestore write succeeded. Document ID:", docRef.id);
//       } catch (error) {
//         console.error("Test Firestore write failed:", error);
//       }
//     };

//     testWrite();
//   }, []);

//   return (
//     <>
//       <StatusBar style="auto" />
//       <StackNavigator />
//     </>
//   );
// };

// export default App;

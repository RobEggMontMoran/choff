import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/StackNavigator";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <StackNavigator />
    </>
  );
};

export default App;

// // Test Firestore write used to verify successful Firebase integration
// // Retained here for reference or future debugging if needed

// import { useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
// import StackNavigator from "./navigation/StackNavigator";
// import { collection, addDoc } from "firebase/firestore";
// import db from "./firestore";

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

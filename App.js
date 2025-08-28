import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/StackNavigator";
import { Provider as PaperProvider } from "react-native-paper";

/**
 * The root component of the application
 * It renders the main StackNavigator and wraps the entire app in the PaperProvider,
 * which provides the Material Design theme to all child components
 */
const App = () => {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <StackNavigator />
    </PaperProvider>
  );
};

export default App;

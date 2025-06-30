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

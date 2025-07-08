import { View, Text, StyleSheet, Button } from "react-native";

const DevelopmentScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Development Hub</Text>

      <View style={styles.topButton}>
        <Button title="LogIn Screen" onPress={() => navigation.navigate("LogIn")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Home Screen" onPress={() => navigation.navigate("Home")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Bean Entry Screen" onPress={() => navigation.navigate("BeanEntry")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Bean Library Screen" onPress={() => navigation.navigate("BeanLibrary")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Brew Entry Screen" onPress={() => navigation.navigate("BrewEntry")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Brew History Screen" onPress={() => navigation.navigate("BrewHistory")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button title="Profile Screen" onPress={() => navigation.navigate("Profile")} />
      </View>

      <View style={styles.button}>
        <Button title="Settings Screen" onPress={() => navigation.navigate("Settings")} />
      </View>

      <View style={styles.button}>
        <Button title="Analytics Screen" onPress={() => navigation.navigate("Analytics")} />
      </View>

      <View style={styles.button}>
        <Button title="Create Account Screen" onPress={() => navigation.navigate("CreateAccount")} color={"green"} />
      </View>

      <View style={styles.button}>
        <Button
          title="Component Testing Screen"
          onPress={() => navigation.navigate("ComponentTesting")}
          color={"green"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 42,
    textAlign: "center",
    marginTop: 50,
  },
  button: {
    marginVertical: 6,
    marginHorizontal: 40,
  },
  topButton: {
    marginTop: 35,
    marginVertical: 6,
    marginHorizontal: 40,
  },
});

export default DevelopmentScreen;

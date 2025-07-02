import { View, Text, StyleSheet, Button } from "react-native";

const BeanEntryScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Bean Library</Text>
        <Text style={styles.subHeadingText}>Add New Coffee Beans or Editing Existing Ones</Text>
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Email Address</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter password"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {password.length > 0 && password.length < 6 ? (
          <Text style={styles.warningText}>Password must be longer than 5 characters</Text>
        ) : null}
      </View> */}
      {/* <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={() => console.log("Logging in...")} color="peru" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "blanchedalmond",
  },
  headingContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 80,
  },
  headingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 3,
  },
  subHeadingText: {
    fontSize: 15,
    color: "sienna",
    marginTop: 4,
    letterSpacing: 1,
  },
});

export default BeanEntryScreen;

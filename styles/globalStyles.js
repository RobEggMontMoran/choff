import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "blanchedalmond",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  bigHeadingText: {
    fontSize: 65,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 3,
  },
  smallHeadingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 2,
  },
  subHeadingText: {
    fontSize: 18,
    color: "sienna",
    marginTop: 4,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    borderColor: "black",
    borderWidth: 2,
    fontSize: 18,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "oldlace",
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  warningText: {
    fontSize: 15,
    color: "red",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 80,
  },
});

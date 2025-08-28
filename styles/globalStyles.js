import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Layouts
  screenBase: {
    flex: 1,
    padding: 20,
    backgroundColor: "blanchedalmond",
  },
  screenCentered: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "blanchedalmond",
  },

  // Headings
  headingXL: {
    fontSize: 65,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 3,
  },
  headingL: {
    fontSize: 40,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 2,
  },
  headingM: {
    fontSize: 30,
    fontWeight: "bold",
    color: "saddlebrown",
  },
  headingS: {
    fontSize: 20,
    fontWeight: "bold",
    color: "saddlebrown",
  },

  // Subheadings
  subheadingL: {
    fontSize: 18,
    color: "sienna",
    marginTop: 4,
    letterSpacing: 1,
  },
  subheadingM: {
    fontSize: 15,
    color: "sienna",
    marginTop: 2,
    letterSpacing: 0.5,
  },

  // Labels
  textLabelXL: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  textLabelL: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textLabelM: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textLabelS: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },

  // Inputs
  inputField: {
    borderColor: "black",
    borderWidth: 2,
    fontSize: 18,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "oldlace",
  },
  inputWrapper: {
    marginBottom: 20,
  },

  // Warnings
  errorText: {
    fontSize: 15,
    color: "red",
    marginTop: 4,
  },

  // Alignments
  alignCenter: {
    alignItems: "center",
  },

  // Spacers
  spacerS: {
    marginBottom: 10,
  },
  spacerM: {
    marginBottom: 20,
  },
  spacerL: {
    marginBottom: 40,
  },
  spacerXL: {
    marginBottom: 60,
  },

  // Bean Library and Brew History Screen formatting
  cardWrapper: {
    marginBottom: 12,
  },
  listSpacing: {
    paddingBottom: 40,
  },
  floatingButton: {
    position: "absolute",
    bottom: 50,
    right: 10,
    backgroundColor: "saddlebrown",
    borderRadius: 40,
    padding: 16,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "sienna",
  },

  // Bean and Brew Entry Screen Formatting
  scrollContent: {
    padding: 16,
    backgroundColor: "blanchedalmond",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "oldlace",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "saddlebrown",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "oldlace",
  },
  button: {
    marginTop: 16,
    marginBottom: 60,
  },
  sliderLabel: {
    fontSize: 16,
    color: "saddlebrown",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 60,
  },
  deleteButton: {
    flex: 1,
    marginRight: 8,
    borderColor: "firebrick",
  },
  updateButton: {
    flex: 1,
    marginLeft: 8,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "peru",
  },
});

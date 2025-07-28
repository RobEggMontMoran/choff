import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, Menu, Switch, Card, Chip } from "react-native-paper";
import Slider from "@react-native-community/slider";
import global from "../styles/globalStyles";
import { addBean } from "../src/firebase/beans";

const BeanEntryScreen = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // Mandatory fields
  const [beanName, setBeanName] = useState("");
  const [roaster, setRoaster] = useState("");
  const [origin, setOrigin] = useState("");
  const [roastType, setRoastType] = useState("");
  const [rating, setRating] = useState(5); // Default to 5

  // Optional fields
  const [blend, setBlend] = useState("");
  const [roastDate, setRoastDate] = useState("");
  const [processMethod, setProcessMethod] = useState("");
  const [bagSize, setBagSize] = useState(250); // Default to 250g
  const [price, setPrice] = useState(15.0); // Default to €15.00
  const [isDecaf, setIsDecaf] = useState(false);
  const [flavourProfile, setFlavourProfile] = useState([]);
  const [userNotes, setUserNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState(""); // *NB* Will hold the image URL

  // Menu visibility state
  const [roastMenuVisible, setRoastMenuVisible] = useState(false);
  const [blendMenuVisible, setBlendMenuVisible] = useState(false);
  const [processMenuVisible, setProcessMenuVisible] = useState(false);

  // Flavour profile options
  // *NB* Possibly add custom option later
  const availableFlavours = ["Fruity", "Nutty", "Chocolatey", "Floral", "Earthy", "Sweet", "Citrus", "Smokey", "Tart"];

  const toggleFlavour = (flavour) => {
    setFlavourProfile((prev) => (prev.includes(flavour) ? prev.filter((f) => f !== flavour) : [...prev, flavour]));
  };

  // Updated handleSave function to be async and call our Firestore function
  const handleSave = async () => {
    // Basic validation to ensure mandatory fields are filled
    if (!beanName || !roaster || !roastType) {
      Alert.alert("Missing Details", "Please fill in all mandatory fields (Bean Name, Roaster, and Roast Type).");
      return;
    }

    setIsSubmitting(true);

    const beanData = {
      // Mandatory fields
      beanName,
      roaster,
      roastType,

      // Optional fields
      origin,
      rating: parseFloat(rating.toFixed(1)),
      blend,
      roastDate,
      processMethod,
      bagSize,
      price: parseFloat(price.toFixed(2)),
      isDecaf,
      flavourProfile,
      userNotes,
      photoUrl,
    };

    try {
      await addBean(beanData);
      Alert.alert("Success!", "Your bean has been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save bean. Please try again.");
      console.error("Error in handleSave:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSave = () => {
  //   const beanData = {
  //     beanName,
  //     roaster,
  //     origin,
  //     roastType,
  //     rating: parseFloat(rating.toFixed(1)),

  //     blend,
  //     roastDate,
  //     processMethod,
  //     bagSize,
  //     price: parseFloat(price.toFixed(2)),
  //     isDecaf,
  //     flavourProfile,
  //     userNotes,
  //     photoUrl,
  //   };
  //   console.log("Saving Bean Data:", beanData);
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={local.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={global.alignCenter}>
              <Text style={global.headingL}>Add New Bean</Text>
              <Text style={global.subheadingM}>Log your Espresso Bean Details</Text>
            </View>
            <View style={global.spacerM} />

            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Mandatory Details</Text>

                <TextInput
                  label="Bean Name"
                  value={beanName}
                  onChangeText={setBeanName}
                  style={local.input}
                  mode="outlined"
                />
                <TextInput
                  label="Roaster"
                  value={roaster}
                  onChangeText={setRoaster}
                  style={local.input}
                  mode="outlined"
                />
                <TextInput label="Origin" value={origin} onChangeText={setOrigin} style={local.input} mode="outlined" />

                <Menu
                  visible={roastMenuVisible}
                  onDismiss={() => setRoastMenuVisible(false)}
                  contentStyle={{ backgroundColor: "oldlace" }}
                  anchor={
                    <Button
                      icon="thermometer"
                      mode="outlined"
                      onPress={() => setRoastMenuVisible(true)}
                      style={local.input}
                      textColor="saddlebrown"
                    >
                      {roastType || "Select Roast Type"}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setRoastType("Light");
                      setRoastMenuVisible(false);
                    }}
                    title="Light"
                  />
                  <Menu.Item
                    onPress={() => {
                      setRoastType("Medium");
                      setRoastMenuVisible(false);
                    }}
                    title="Medium"
                  />
                  <Menu.Item
                    onPress={() => {
                      setRoastType("Dark");
                      setRoastMenuVisible(false);
                    }}
                    title="Dark"
                  />
                </Menu>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Rating: {rating.toFixed(1)} / 10</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.5}
                    value={rating}
                    onValueChange={setRating}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Optional Details</Text>

                <Menu
                  visible={blendMenuVisible}
                  onDismiss={() => setBlendMenuVisible(false)}
                  contentStyle={{ backgroundColor: "oldlace" }}
                  anchor={
                    <Button
                      icon="grain"
                      mode="outlined"
                      onPress={() => setBlendMenuVisible(true)}
                      style={local.input}
                      textColor="saddlebrown"
                    >
                      {blend || "Select Blend Type"}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setBlend("Single Origin");
                      setBlendMenuVisible(false);
                    }}
                    title="Single Origin"
                  />
                  <Menu.Item
                    onPress={() => {
                      setBlend("Blended");
                      setBlendMenuVisible(false);
                    }}
                    title="Blended"
                  />
                  <Menu.Item
                    onPress={() => {
                      setBlend("Other");
                      setBlendMenuVisible(false);
                    }}
                    title="Other"
                  />
                </Menu>

                <Menu
                  visible={processMenuVisible}
                  onDismiss={() => setProcessMenuVisible(false)}
                  contentStyle={{ backgroundColor: "oldlace" }}
                  anchor={
                    <Button
                      icon="beaker-outline"
                      mode="outlined"
                      onPress={() => setProcessMenuVisible(true)}
                      style={local.input}
                      textColor="saddlebrown"
                    >
                      {processMethod || "Select Process Method"}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setProcessMethod("Washed");
                      setProcessMenuVisible(false);
                    }}
                    title="Washed"
                  />
                  <Menu.Item
                    onPress={() => {
                      setProcessMethod("Natural");
                      setProcessMenuVisible(false);
                    }}
                    title="Natural"
                  />
                  <Menu.Item
                    onPress={() => {
                      setProcessMethod("Honey");
                      setProcessMenuVisible(false);
                    }}
                    title="Honey"
                  />
                </Menu>

                <TextInput
                  label="Roast Date (DD-MM-YYYY)"
                  value={roastDate}
                  onChangeText={setRoastDate}
                  style={local.input}
                  mode="outlined"
                  keyboardType="numeric"
                />

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Bag Size: {bagSize}g</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={100}
                    maximumValue={1000}
                    step={50}
                    value={bagSize}
                    onValueChange={setBagSize}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Price: €{price.toFixed(2)}</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={5}
                    maximumValue={50}
                    step={0.5}
                    value={price}
                    onValueChange={setPrice}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Flavour Profile</Text>
                  <View style={local.chipContainer}>
                    {availableFlavours.map((flavour) => (
                      <Chip
                        key={flavour}
                        icon="tag"
                        selected={flavourProfile.includes(flavour)}
                        onPress={() => toggleFlavour(flavour)}
                        style={local.chip}
                      >
                        {flavour}
                      </Chip>
                    ))}
                  </View>
                </View>

                <View style={local.switchContainer}>
                  <Text style={local.sliderLabel}>Decaf?</Text>
                  <Switch value={isDecaf} onValueChange={setIsDecaf} color="peru" />
                </View>

                <TextInput
                  label="Comments"
                  value={userNotes}
                  onChangeText={setUserNotes}
                  style={local.input}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                />

                <Button
                  icon="camera"
                  mode="outlined"
                  onPress={() => console.log("Image picker to be implemented")}
                  style={local.input}
                  textColor="saddlebrown"
                >
                  Add Photo
                </Button>
              </Card.Content>
            </Card>

            <Button
              mode="contained"
              onPress={handleSave}
              style={local.button}
              buttonColor="peru"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Save Bean
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
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
    color: "#333",
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "blanchedalmond",
    borderColor: "black",
    borderWidth: 0.5,
  },
});

export default BeanEntryScreen;

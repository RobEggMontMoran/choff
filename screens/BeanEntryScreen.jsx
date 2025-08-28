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
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, Menu, Switch, Card, Chip } from "react-native-paper";
import Slider from "@react-native-community/slider";
import global from "../styles/globalStyles";
import { addBean, updateBean, deleteBean } from "../src/firebase/beans";
import * as ImagePicker from "expo-image-picker";
import { uploadImageAndGetDownloadURL } from "../src/firebase/storage";
import DatePickerInput from "../components/DatePickerInput";

/**
 * The BeanEntryScreen serves as both the creation and editing form for a bean
 * It operates in two modes, determined by the `existingBean` route parameter:
 * - 'Add Mode': The form is empty, and the final action saves a new document
 * - 'Edit Mode': The form is pre-populated with existing bean data, and the
 * final actions are to update or delete the existing document
 */
const BeanEntryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const existingBean = route.params?.bean;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialise all form fields from the `existingBean` prop if it exists, otherwise use default values
  // Mandatory fields
  const [name, setName] = useState(existingBean?.name || "");
  const [roaster, setRoaster] = useState(existingBean?.roaster || "");
  const [origin, setOrigin] = useState(existingBean?.origin || "");
  const [roastDate, setRoastDate] = useState(existingBean?.roastDate || new Date());
  const [rating, setRating] = useState(existingBean?.rating || 0);

  // Optional fields
  const [roastType, setRoastType] = useState(existingBean?.roastType || "");
  const [blend, setBlend] = useState(existingBean?.blend || "");
  const [processMethod, setProcessMethod] = useState(existingBean?.processMethod || "");
  const [bagSize, setBagSize] = useState(existingBean?.bagSize || 0);
  const [price, setPrice] = useState(existingBean?.price || 0);
  const [isDecaf, setIsDecaf] = useState(existingBean?.isDecaf || false);
  const [flavourProfile, setFlavourProfile] = useState(existingBean?.flavourProfile || []);
  const [userNotes, setUserNotes] = useState(existingBean?.userNotes || "");
  const [photoUrl, setPhotoUrl] = useState(existingBean?.photoUrl || "");

  // State to control visibility of the dropdown menus
  const [roastMenuVisible, setRoastMenuVisible] = useState(false);
  const [blendMenuVisible, setBlendMenuVisible] = useState(false);
  const [processMenuVisible, setProcessMenuVisible] = useState(false);

  // Hardcoded list of flavour profile tags
  const availableFlavours = ["Fruity", "Nutty", "Chocolatey", "Floral", "Earthy", "Sweet", "Citrus", "Smokey", "Tart"];

  // Adds or removes a flavour from the flavourProfile array
  const toggleFlavour = (flavour) => {
    setFlavourProfile((prev) => (prev.includes(flavour) ? prev.filter((f) => f !== flavour) : [...prev, flavour]));
  };

  // Gathers all state variables into a single object for Firebase
  const getBeanDataFromState = () => ({
    name,
    roaster,
    origin,
    rating: parseFloat(rating.toFixed(1)),
    roastType,
    blend,
    roastDate,
    processMethod,
    bagSize,
    price: parseFloat(price.toFixed(2)),
    isDecaf,
    flavourProfile,
    userNotes,
    photoUrl,
  });

  // Handles the submission of a new bean
  const handleAdd = async () => {
    // Basic validation to ensure mandatory fields are filled
    if (!name || !roaster || !origin || !roastDate) {
      Alert.alert("Missing Details", "Please fill in all mandatory fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addBean(getBeanDataFromState());
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save bean.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles updating an existing bean
  const handleUpdate = async () => {
    if (!existingBean?.id) return;
    setIsSubmitting(true);
    try {
      await updateBean(existingBean.id, getBeanDataFromState());
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not update bean.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles deleting an existing bean
  const handleDelete = () => {
    if (!existingBean?.id) return;
    // Display a confirmation alert to prevent accidental deletion
    Alert.alert("Delete Bean", "Are you sure you want to delete this bean? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsSubmitting(true);
          try {
            await deleteBean(existingBean.id);
            Alert.alert("Deleted!", "Your bean has been deleted.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Could not delete bean.");
          } finally {
            setIsSubmitting(false);
          }
        },
      },
    ]);
  };

  // Handles the full image picking and uploading flow
  const handleImagePick = async () => {
    // First, ask for permission to access the user's media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You've refused to allow this app to access your photos!");
      return;
    }

    // Launch the image picker with specific options for cropping and compression
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Enforce a square aspect ratio
      quality: 0.5, // Compress the image to save space
    });
    if (pickerResult.canceled) {
      return;
    }
    // If an image is selected, upload it via the storage service and update state
    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      try {
        setIsSubmitting(true);
        const downloadURL = await uploadImageAndGetDownloadURL(uri);
        setPhotoUrl(downloadURL);
      } catch (error) {
        Alert.alert("Upload Failed", "Sorry, we couldn't upload your image.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={local.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={global.alignCenter}>
              <Text style={global.headingL}>{existingBean ? "Edit Bean" : "Add New Bean"}</Text>
              <Text style={global.subheadingM}>Log your Espresso Bean Details</Text>
            </View>
            <View style={global.spacerM} />

            {/* Card for mandatory input fields */}
            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Mandatory Details</Text>
                <TextInput label="Bean Name" value={name} onChangeText={setName} style={local.input} mode="outlined" />
                <TextInput
                  label="Roaster"
                  value={roaster}
                  onChangeText={setRoaster}
                  style={local.input}
                  mode="outlined"
                />
                <TextInput label="Origin" value={origin} onChangeText={setOrigin} style={local.input} mode="outlined" />

                {/* Reusable component for date selection */}
                <View>
                  <DatePickerInput label="Roast Date" dateValue={roastDate} onDateChange={setRoastDate} />
                </View>

                {/* Slider for overall rating */}
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

            {/* Card for optional input fields */}
            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Optional Details</Text>

                {/* Dropdown menu for Roast Type */}
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

                {/* Dropdown menu for Blend Type */}
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

                {/* Dropdown menu for Process Method */}
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

                {/* Slider for Bag Size */}
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

                {/* Slider for Price */}
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

                {/* Chip group for Flavour Profile */}
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

                {/* Switch for Decaf */}
                <View style={local.switchContainer}>
                  <Text style={local.sliderLabel}>Decaf?</Text>
                  <Switch value={isDecaf} onValueChange={setIsDecaf} color="peru" />
                </View>

                {/* Text input for Comments */}
                <TextInput
                  label="Comments"
                  value={userNotes}
                  onChangeText={setUserNotes}
                  style={local.input}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                />

                {/* Button to pick an image */}
                <Button
                  icon="camera"
                  mode="outlined"
                  onPress={handleImagePick}
                  style={local.input}
                  textColor="saddlebrown"
                  disabled={isSubmitting}
                >
                  {photoUrl ? "Change Photo" : "Add Photo"}
                </Button>

                {/* Display a preview of the selected or existing image */}
                {photoUrl ? <Image source={{ uri: photoUrl }} style={local.imagePreview} /> : null}
              </Card.Content>
            </Card>

            {/* Conditionally render action buttons based on whether we are adding or editing */}
            {existingBean ? (
              <View style={local.buttonRow}>
                <Button
                  mode="outlined"
                  onPress={handleDelete}
                  style={local.deleteButton}
                  textColor="firebrick"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Delete
                </Button>
                <Button
                  mode="contained"
                  onPress={handleUpdate}
                  style={local.updateButton}
                  buttonColor="peru"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </View>
            ) : (
              <Button
                mode="contained"
                onPress={handleAdd}
                style={local.button}
                buttonColor="peru"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Save Bean
              </Button>
            )}
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
    color: "saddlebrown",
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

export default BeanEntryScreen;

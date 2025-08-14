import React, { useState, useEffect, useCallback } from "react";
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
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";

const BeanEntryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Hook to access route params
  const existingBean = route.params?.bean; // Check if a bean was passed
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // State Initializationinitialize the state directly from 'existingBean' - if it exists.
  // Mandatory fields
  const [name, setName] = useState(existingBean?.name || "");
  const [roaster, setRoaster] = useState(existingBean?.roaster || "");
  const [origin, setOrigin] = useState(existingBean?.origin || "");
  const [roastType, setRoastType] = useState(existingBean?.roastType || "");
  const [rating, setRating] = useState(existingBean?.rating || 0);

  // Optional fields
  const [blend, setBlend] = useState(existingBean?.blend || "");
  const [roastDate, setRoastDate] = useState(existingBean?.roastDate || "");
  const [processMethod, setProcessMethod] = useState(existingBean?.processMethod || "");
  const [bagSize, setBagSize] = useState(existingBean?.bagSize || 0);
  const [price, setPrice] = useState(existingBean?.price || 0);
  const [isDecaf, setIsDecaf] = useState(existingBean?.isDecaf || false);
  const [flavourProfile, setFlavourProfile] = useState(existingBean?.flavourProfile || []);
  const [userNotes, setUserNotes] = useState(existingBean?.userNotes || "");
  const [photoUrl, setPhotoUrl] = useState(existingBean?.photoUrl || "");

  // Menu visibility state
  const [roastMenuVisible, setRoastMenuVisible] = useState(false);
  const [blendMenuVisible, setBlendMenuVisible] = useState(false);
  const [processMenuVisible, setProcessMenuVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Flavour profile options
  // *NB* Possibly add custom option later
  const availableFlavours = ["Fruity", "Nutty", "Chocolatey", "Floral", "Earthy", "Sweet", "Citrus", "Smokey", "Tart"];

  const toggleFlavour = (flavour) => {
    setFlavourProfile((prev) => (prev.includes(flavour) ? prev.filter((f) => f !== flavour) : [...prev, flavour]));
  };

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

  const handleAdd = async () => {
    if (!name || !roaster || !origin) {
      Alert.alert("Missing Details", "Please fill in all mandatory fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addBean(getBeanDataFromState());
      Alert.alert("Success!", "Your bean has been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save bean.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!existingBean?.id) return;
    setIsSubmitting(true);
    try {
      await updateBean(existingBean.id, getBeanDataFromState());
      Alert.alert("Success!", "Your bean has been updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not update bean.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!existingBean?.id) return;
    // Confirmation alert to prevent accidental deletion
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

  const handleImagePick = async () => {
    // Ask for permission to access the media library.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You've refused to allow this app to access your photos!");
      return;
    }

    // Launch the image picker.
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Enforce a square aspect ratio
      quality: 0.5, // Compress the image to save space
    });

    if (pickerResult.canceled) {
      return;
    }

    // If an image is selected, upload it and update the state.
    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      try {
        setIsSubmitting(true); // Show a loading indicator
        const downloadURL = await uploadImageAndGetDownloadURL(uri);
        setPhotoUrl(downloadURL); // Update the state with the new URL
        // Alert.alert("Success", "Image uploaded successfully!");
      } catch (error) {
        Alert.alert("Upload Failed", "Sorry, we couldn't upload your image.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const onDismiss = useCallback(() => {
    setDatePickerVisible(false);
  }, [setDatePickerVisible]);

  const onConfirm = useCallback(
    (params) => {
      setDatePickerVisible(false);
      // We get the date from the params and format it
      setRoastDate(params.date.toLocaleDateString("en-GB"));
    },
    [setDatePickerVisible, setRoastDate],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
      {/* Date Selector */}
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={datePickerVisible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
      />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={local.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={global.alignCenter}>
              <Text style={global.headingL}>Add New Bean</Text>
              <Text style={global.subheadingM}>Log your Espresso Bean Details</Text>
            </View>
            <View style={global.spacerM} />

            {/* Mandatory Inputs */}
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

            {/* Optional Inputs */}
            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Optional Details</Text>

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

                {/* <TextInput
                  label="Roast Date (DD-MM-YYYY)"
                  value={roastDate}
                  onChangeText={setRoastDate}
                  style={local.input}
                  mode="outlined"
                  keyboardType="numeric"
                /> */}
                <Button
                  icon="calendar"
                  mode="outlined"
                  onPress={() => setDatePickerVisible(true)}
                  style={local.input}
                  textColor="saddlebrown"
                >
                  {roastDate || "Select Roast Date"}
                </Button>

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
                  onPress={handleImagePick}
                  style={local.input}
                  textColor="saddlebrown"
                  disabled={isSubmitting}
                >
                  {photoUrl ? "Change Photo" : "Add Photo"}
                </Button>

                {/* This will display the preview image once a photo is uploaded */}
                {photoUrl ? <Image source={{ uri: photoUrl }} style={local.imagePreview} /> : null}
              </Card.Content>
            </Card>

            {/* Action buttons (conditional rendering) */}
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

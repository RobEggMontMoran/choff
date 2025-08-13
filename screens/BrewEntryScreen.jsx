import React, { useState, useCallback, useEffect } from "react";
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
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, Menu, Card, List } from "react-native-paper";
import Slider from "@react-native-community/slider";
import global from "../styles/globalStyles";
import { getBeans } from "../src/firebase/beans";
import { addBrew, updateBrew, deleteBrew } from "../src/firebase/brews";
import * as ImagePicker from "expo-image-picker";
import { uploadImageAndGetDownloadURL } from "../src/firebase/storage";

const BrewEntryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Hook to access route params
  const existingBrew = route.params?.brew; // Check if a brew was passed

  // Menu visibility state
  const [beanMenuVisible, setBeanMenuVisible] = useState(false);
  const [optionalSectionExpanded, setOptionalSectionExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // loading state

  // Timer state
  const [time, setTime] = useState(0); // Holds the elapsed time in seconds
  const [isActive, setIsActive] = useState(false); // Tracks if the timer is running

  // Data state
  const [availableBeans, setAvailableBeans] = useState([]); // holds beans fetched from Firestore
  // Initialisde selectedBeam from existingBrew if present
  const [selectedBean, setSelectedBean] = useState(
    existingBrew ? { id: existingBrew.beanId, name: existingBrew.beanName, roaster: existingBrew.roaster } : null,
  );

  // Mandatory fields
  const [dose, setDose] = useState(existingBrew?.dose || 8);
  const [yieldAmount, setYieldAmount] = useState(existingBrew?.yieldAmount || 20);
  const [brewTime, setBrewTime] = useState(existingBrew?.brewTime || 0);
  const [temperature, setTemperature] = useState(existingBrew?.temperature || 85);
  const [grindSize, setGrindSize] = useState(existingBrew?.grindSize || 1);
  const [rating, setRating] = useState(existingBrew?.rating || 0);
  const [date, setDate] = useState(existingBrew?.date || new Date().toLocaleDateString("en-GB")); // Defaults to today's date

  // Optional fields
  const [aroma, setAroma] = useState(existingBrew?.tastingProfile?.aroma || 0);
  const [acidity, setAcidity] = useState(existingBrew?.tastingProfile?.acidity || 0);
  const [sweetness, setSweetness] = useState(existingBrew?.tastingProfile?.sweetness || 0);
  const [body, setBody] = useState(existingBrew?.tastingProfile?.body || 0);
  const [bitterness, setBitterness] = useState(existingBrew?.tastingProfile?.bitterness || 0);
  const [notes, setNotes] = useState(existingBrew?.notes || "");
  const [photoUrl, setPhotoUrl] = useState(existingBrew?.photoUrl || "");

  // Fetch beans every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchAvailableBeans = async () => {
        try {
          const beans = await getBeans();
          setAvailableBeans(beans);
        } catch (error) {
          Alert.alert("Error", "Could not load your beans.");
        }
      };
      fetchAvailableBeans();
    }, []),
  );

  const handleSelectBean = (bean) => {
    setSelectedBean(bean);
    setBeanMenuVisible(false);
  };

  const getBrewDataFromState = () => ({
    beanId: selectedBean.id,
    beanName: selectedBean.name,
    roaster: selectedBean.roaster,
    dose: parseFloat(dose.toFixed(1)),
    yieldAmount: parseFloat(yieldAmount.toFixed(1)),
    brewTime: parseFloat(brewTime.toFixed(1)),
    temperature: parseFloat(temperature.toFixed(1)),
    grindSize,
    rating: parseFloat(rating.toFixed(1)),
    date,
    tastingProfile: { aroma, acidity, sweetness, body, bitterness },
    notes,
    photoUrl,
  });

  const handleAdd = async () => {
    if (!selectedBean) {
      Alert.alert("No Bean Selected", "Please select a bean for this brew.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addBrew(getBrewDataFromState());
      Alert.alert("Success!", "Your brew has been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save brew.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!existingBrew?.id) return;
    setIsSubmitting(true);
    try {
      await updateBrew(existingBrew.id, getBrewDataFromState());
      Alert.alert("Success!", "Your brew has been updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not update brew.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!existingBrew?.id) return;
    Alert.alert("Delete Brew", "Are you sure you want to delete this brew? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsSubmitting(true);
          try {
            await deleteBrew(existingBrew.id);
            Alert.alert("Deleted!", "Your brew has been deleted.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Could not delete brew.");
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

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds = String(Math.floor(timeInSeconds % 60)).padStart(2, "0");
    const tenthSeconds = String(Math.floor((timeInSeconds * 10) % 10));
    return `${minutes}:${seconds}.${tenthSeconds}`;
  };

  // Timers useEffect
  useEffect(() => {
    // Only set up an interval if the timer is active.
    if (isActive) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);

      // The cleanup function will run when isActive changes to false or the screen is left.
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  // const handleStop = () => {
  //   setIsActive(false);
  //   // This takes the final time and applies it to your brew time slider
  //   setBrewTime(parseFloat(time.toFixed(1)));
  // };

  const handleToggle = () => {
    // Pausing updates the brewTime slider with the current time
    if (isActive) {
      setBrewTime(parseFloat(time.toFixed(1)));
    }
    // toggles the timer's active state.
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={local.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={global.alignCenter}>
              <Text style={global.headingL}>Add New Brew</Text>
              <Text style={global.subheadingM}>Log your Espresso Recipe</Text>
            </View>
            <View style={global.spacerM} />

            <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Recipe</Text>

                <Menu
                  visible={beanMenuVisible}
                  onDismiss={() => setBeanMenuVisible(false)}
                  contentStyle={{ backgroundColor: "oldlace" }}
                  anchor={
                    <Button
                      icon="coffee"
                      mode="outlined"
                      onPress={() => setBeanMenuVisible(true)}
                      style={local.input}
                      textColor="saddlebrown"
                    >
                      {selectedBean ? `${selectedBean.name} (${selectedBean.roaster})` : "Select a Bean"}
                    </Button>
                  }
                >
                  {availableBeans.map((bean) => (
                    <Menu.Item
                      key={bean.id}
                      onPress={() => handleSelectBean(bean)}
                      title={`${bean.name} (${bean.roaster})`}
                    />
                  ))}
                </Menu>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Dose: {typeof dose === "number" ? dose.toFixed(1) : "18.0"}g</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={8}
                    maximumValue={25}
                    step={0.1}
                    value={dose}
                    onValueChange={setDose}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>
                    Yield: {typeof yieldAmount === "number" ? yieldAmount.toFixed(1) : "36.0"}g
                  </Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={20}
                    maximumValue={60}
                    step={0.1}
                    value={yieldAmount}
                    onValueChange={setYieldAmount}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>
                    Time: {typeof brewTime === "number" ? brewTime.toFixed(1) : "28.0"}s
                  </Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={45}
                    step={0.5}
                    value={brewTime}
                    onValueChange={setBrewTime}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                {/* <View style={global.spacerM} /> */}

                {/* Timer Display and Controls */}
                <View style={local.timerContainer}>
                  <Text style={local.timerText}>{formatTime(time)}</Text>
                  {/* <View style={local.timerControls}>
                    <Button mode="contained" onPress={() => setIsActive(!isActive)} buttonColor="peru">
                      {isActive ? "Pause" : "Start"}
                    </Button>
                    <Button mode="contained-tonal" onPress={handleStop} buttonColor="peru">
                      Stop
                    </Button>
                    <Button mode="outlined" onPress={handleReset} textColor="saddlebrown">
                      Reset
                    </Button>
                  </View> */}
                  <View style={local.timerControls}>
                    <Button mode="contained" onPress={handleToggle} buttonColor="peru">
                      {isActive ? "Pause" : "Start"}
                    </Button>
                    <Button mode="outlined" onPress={handleReset} textColor="saddlebrown">
                      Reset
                    </Button>
                  </View>
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>
                    Temperature: {typeof temperature === "number" ? temperature.toFixed(1) : "92.0"}°C
                  </Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={85}
                    maximumValue={100}
                    step={0.5}
                    value={temperature}
                    onValueChange={setTemperature}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>Grind Size: {grindSize}</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={1}
                    maximumValue={20}
                    step={1}
                    value={grindSize}
                    onValueChange={setGrindSize}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <View style={local.input}>
                  <Text style={local.sliderLabel}>
                    Overall Rating: {typeof rating === "number" ? rating.toFixed(1) : "5.0"}
                  </Text>
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

                <TextInput
                  label="Brew Date"
                  value={date}
                  onChangeText={setDate}
                  style={local.input}
                  mode="outlined"
                  disabled
                />
              </Card.Content>
            </Card>

            {/* Accordion - Optional Data Input */}
            <List.Accordion
              title="Optional Feedback & Photo"
              titleStyle={local.accordionTitle}
              style={local.accordion}
              expanded={optionalSectionExpanded}
              onPress={() => setOptionalSectionExpanded(!optionalSectionExpanded)}
              left={(props) => <List.Icon {...props} icon="playlist-edit" color="saddlebrown" />}
            >
              {/* <Card style={local.card}> */}
              <Card style={[local.card, { marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
                <Card.Content>
                  {/* <Card.Content style={{ paddingHorizontal: 0 }}> */}
                  <View style={local.input}>
                    <Text style={local.sliderLabel}>Aroma: {aroma}</Text>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      value={aroma}
                      onValueChange={setAroma}
                      minimumTrackTintColor="peru"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="peru"
                    />
                  </View>
                  <View style={local.input}>
                    <Text style={local.sliderLabel}>Acidity: {acidity}</Text>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      value={acidity}
                      onValueChange={setAcidity}
                      minimumTrackTintColor="peru"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="peru"
                    />
                  </View>
                  <View style={local.input}>
                    <Text style={local.sliderLabel}>Sweetness: {sweetness}</Text>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      value={sweetness}
                      onValueChange={setSweetness}
                      minimumTrackTintColor="peru"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="peru"
                    />
                  </View>
                  <View style={local.input}>
                    <Text style={local.sliderLabel}>Body: {body}</Text>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      value={body}
                      onValueChange={setBody}
                      minimumTrackTintColor="peru"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="peru"
                    />
                  </View>
                  <View style={local.input}>
                    <Text style={local.sliderLabel}>Bitterness: {bitterness}</Text>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      value={bitterness}
                      onValueChange={setBitterness}
                      minimumTrackTintColor="peru"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="peru"
                    />
                  </View>

                  <TextInput
                    label="Comments"
                    value={notes}
                    onChangeText={setNotes}
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
            </List.Accordion>

            <View style={{ height: 20 }} />

            {existingBrew ? (
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
              <Button mode="contained" onPress={handleAdd} style={local.button} buttonColor="peru">
                Save Brew
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
    color: "#333",
    marginBottom: 8,
  },
  accordion: {
    backgroundColor: "oldlace",
    borderRadius: 12,
    borderColor: "#d3c5b4",
    borderWidth: 1,
  },
  accordionTitle: {
    color: "saddlebrown",
    fontWeight: "bold",
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
  timerContainer: {
    alignItems: "center",
    marginBottom: 25,
    paddingVertical: 10,
    backgroundColor: "oldlace",
    borderRadius: 12,
  },
  timerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "saddlebrown",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  timerControls: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
});

export default BrewEntryScreen;

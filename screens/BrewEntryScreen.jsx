import React, { useState, useCallback } from "react";
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
import Timer from "../components/Timer";
import DatePickerInput from "../components/DatePickerInput";
import AiBaristaBlock from "../components/AiBaristaBlock";

const BrewEntryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Hook to access route params
  const existingBrew = route.params?.brew; // Check if a brew was passed

  // Menu visibility state
  const [beanMenuVisible, setBeanMenuVisible] = useState(false);
  const [optionalSectionExpanded, setOptionalSectionExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // loading state

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
  const [date, setDate] = useState(existingBrew?.date || new Date()); // Defaults to today's date

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
    // Ask for permission to access the media library
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

    // If an image is selected, upload it and update the state
    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      try {
        setIsSubmitting(true); // Show a loading indicator
        const downloadURL = await uploadImageAndGetDownloadURL(uri);
        setPhotoUrl(downloadURL); // Update the state with the new URL
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
              <Text style={global.headingL}>{existingBrew ? "Edit Brew" : "Add New Brew"}</Text>
              <Text style={global.subheadingM}>Log your Espresso Recipe</Text>
            </View>

            {/* AI Component */}
            {existingBrew && <AiBaristaBlock brewData={existingBrew} />}

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
                  <Text style={local.sliderLabel}>Dose: {dose.toFixed(1)}g</Text>
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
                    <Text style={local.sliderLabel}>Yield: {yieldAmount.toFixed(1)}g</Text>
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
                  <Text style={local.sliderLabel}>Time: {brewTime.toFixed(1)}s</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={45}
                    step={0.1}
                    value={brewTime}
                    onValueChange={setBrewTime}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
                </View>

                <Timer onTimeChange={setBrewTime} />

                <View style={local.input}>
                  <Text style={local.sliderLabel}>
                    <Text style={local.sliderLabel}>Temperature: {temperature.toFixed(1)}°C</Text>
                  </Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={85}
                    maximumValue={100}
                    step={0.1}
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
                  <Text style={local.sliderLabel}>Overall Rating: {rating.toFixed(1)}</Text>
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

                <View>
                  <DatePickerInput label="Brew Date" dateValue={date} onDateChange={setDate} />
                </View>
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

                  {/* Displays a preview image once a photo is uploaded */}
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
    color: "saddlebrown",
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
});

export default BrewEntryScreen;

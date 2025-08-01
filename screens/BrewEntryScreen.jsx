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
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, Menu, Card, List } from "react-native-paper";
import Slider from "@react-native-community/slider";
import global from "../styles/globalStyles";
import { getBeans } from "../src/firebase/beans";
import { addBrew } from "../src/firebase/brews";

const BrewEntryScreen = () => {
  const navigation = useNavigation();

  // Menu visibility state
  const [beanMenuVisible, setBeanMenuVisible] = useState(false);
  const [optionalSectionExpanded, setOptionalSectionExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // loading state

  // Mandatory fields
  // const [beanName, setBeanName] = useState("");
  const [availableBeans, setAvailableBeans] = useState([]); // holds beans fetched from Firestore
  const [selectedBean, setSelectedBean] = useState(null); // holds the full selected bean object

  const [dose, setDose] = useState(18.0);
  const [yieldAmount, setYieldAmount] = useState(36);
  const [brewTime, setBrewTime] = useState(28);
  const [temperature, setTemperature] = useState(92);
  const [grindSize, setGrindSize] = useState(7);
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-GB")); // Defaults to today's date

  // Optional fields
  const [aroma, setAroma] = useState(0);
  const [acidity, setAcidity] = useState(0);
  const [sweetness, setSweetness] = useState(0);
  const [body, setBody] = useState(0);
  const [bitterness, setBitterness] = useState(0);
  const [notes, setNotes] = useState("");

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

  // const handleSave = () => {
  //   const brewData = {
  //     beanName,
  //     dose: parseFloat(dose.toFixed(1)),
  //     yieldAmount: parseFloat(yieldAmount.toFixed(1)),
  //     brewTime: parseFloat(brewTime.toFixed(1)),
  //     temperature: parseFloat(temperature.toFixed(1)),
  //     grindSize,
  //     rating: parseFloat(rating.toFixed(1)),
  //     date,
  //     tastingProfile: {
  //       aroma,
  //       acidity,
  //       sweetness,
  //       body,
  //       bitterness,
  //     },
  //     notes,
  //   };
  //   console.log("Saving Brew Data:", brewData);
  //   navigation.goBack();
  // };

  const handleSelectBean = (bean) => {
    setSelectedBean(bean);
    setBeanMenuVisible(false);
    // **NB - implement auto-fill measurements
    // with the last used values for this bean.
  };

  const handleSave = async () => {
    if (!selectedBean) {
      Alert.alert("No Bean Selected", "Please select a bean for this brew.");
      return;
    }

    setIsSubmitting(true);

    const brewData = {
      beanId: selectedBean.id, // Store the ID of the bean
      beanName: selectedBean.name, // Store the name (for easy display)
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
    };
    try {
      await addBrew(brewData);
      Alert.alert("Success!", "Your brew has been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save brew. Please try again.");
      console.error("Error in handleSave:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                    minimumValue={15}
                    maximumValue={45}
                    step={0.5}
                    value={brewTime}
                    onValueChange={setBrewTime}
                    minimumTrackTintColor="peru"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="peru"
                  />
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
              title="Optional Feedback & Notes"
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
                </Card.Content>
              </Card>
            </List.Accordion>

            <View style={{ height: 20 }} />

            <Button mode="contained" onPress={handleSave} style={local.button} buttonColor="peru">
              Save Brew
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
});

export default BrewEntryScreen;

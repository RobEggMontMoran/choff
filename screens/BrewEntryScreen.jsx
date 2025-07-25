// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Button,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import global from "../styles/globalStyles";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const BrewEntryScreen = () => {
//   const navigation = useNavigation();

//   const [beanName, setBeanName] = useState(""); // should instead be selected from list
//   const [dose, setDose] = useState("");
//   const [yieldAmount, setYieldAmount] = useState("");
//   const [brewTime, setBrewTime] = useState("");
//   const [temperature, setTemperature] = useState("");
//   // const [method, setMethod] = useState("");
//   const [grindSize, setGrindSize] = useState("");
//   const [aromaRating, setAromaRating] = useState(0);
//   const [sweetnessRating, setSweetnessRating] = useState(0);
//   const [acidityRating, setAcidityRating] = useState(0);
//   const [bitternessRating, setBitternessRating] = useState(0);
//   const [bodyRating, setBodyRating] = useState(0);
//   const [overallRating, setOverallRating] = useState(0);
//   const [notes, setNotes] = useState("");

//   const handleSave = () => {
//     // Placeholder logic — later save to Firebase
//     console.log({
//       beanName,
//       dose,
//       yieldAmount,
//       brewTime,
//       temperature,
//       // method,
//       grindSize,
//       aromaRating,
//       sweetnessRating,
//       acidityRating,
//       bitternessRating,
//       bodyRating,
//       overallRating,
//       notes,
//     });
//     navigation.goBack(); // Placeholder - back to HomeScreen
//   };

//   return (
//     <SafeAreaView style={global.screenBase}>
//       <View style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "android" ? "padding" : "height"}
//           keyboardVerticalOffset={60}
//         >
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             {/* Input fields */}
//             <ScrollView
//               contentContainerStyle={local.scrollContent}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//             >
//               <View style={global.alignCenter}>
//                 <Text style={global.headingL}>Add New Brew</Text>
//                 <Text style={global.subheadingM}>Log your Espresso Recipe</Text>
//               </View>

//               <View style={global.spacerL} />

//               {/* Brewing Measurements */}
//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Coffee Beans</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. Mamba"
//                   value={beanName}
//                   onChangeText={setBeanName}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Dose (g) - Ground Coffee</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 18.5"
//                   keyboardType="numeric"
//                   value={dose}
//                   onChangeText={setDose}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Yield (g) - Brewed Espresso</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 36"
//                   keyboardType="numeric"
//                   value={yieldAmount}
//                   onChangeText={setYieldAmount}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Brew Time (s) - Including Pre-infusion</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 28"
//                   keyboardType="numeric"
//                   value={brewTime}
//                   onChangeText={setBrewTime}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Temperature (°C)</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 94"
//                   keyboardType="numeric"
//                   value={temperature}
//                   onChangeText={setTemperature}
//                 />
//               </View>

//               {/* <View style={global.inputWrapper}>
//               <Text style={global.textLabelL}>Brew Method</Text>
//               <TextInput
//                 style={global.inputField}
//                 placeholder="e.g. Espresso / Aeropress"
//                 value={method}
//                 onChangeText={setMethod}
//               />
//             </View> */}

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Grind Size</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 5 (on your grinder)"
//                   value={grindSize}
//                   onChangeText={setGrindSize}
//                 />
//               </View>

//               {/* Reflection */}
//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Aroma</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 1-10"
//                   keyboardType="numeric"
//                   value={aromaRating}
//                   onChangeText={setAromaRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Sweetness</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 1-10"
//                   keyboardType="numeric"
//                   value={sweetnessRating}
//                   onChangeText={setSweetnessRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Acidity</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 1-10"
//                   keyboardType="numeric"
//                   value={acidityRating}
//                   onChangeText={setAcidityRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Bitterness</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 1-10"
//                   keyboardType="numeric"
//                   value={bitternessRating}
//                   onChangeText={setBitternessRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Body</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 1-10"
//                   keyboardType="numeric"
//                   value={bodyRating}
//                   onChangeText={setBodyRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Overall Rating (1-10)</Text>
//                 <TextInput
//                   style={global.inputField}
//                   placeholder="e.g. 8.5"
//                   keyboardType="numeric"
//                   value={overallRating}
//                   onChangeText={setOverallRating}
//                 />
//               </View>

//               <View style={global.inputWrapper}>
//                 <Text style={global.textLabelL}>Notes</Text>
//                 <TextInput
//                   style={[global.inputField, { height: 160 }]}
//                   placeholder="Taste, technique, adjustments..."
//                   multiline
//                   value={notes}
//                   onChangeText={setNotes}
//                 />
//               </View>

//               <View style={local.buttonSpacing}>
//                 <Button title="Save Brew" onPress={handleSave} color="peru" />
//               </View>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const local = StyleSheet.create({
//   scrollContent: {
//     padding: 10,
//     backgroundColor: "blanchedalmond",
//     flexGrow: 1,
//   },
//   buttonSpacing: {
//     marginTop: 20,
//     marginBottom: 80,
//   },
// });

// export default BrewEntryScreen;

//
//
//
//
// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Text, TextInput, Button, Menu, Card } from "react-native-paper";
// import Slider from "@react-native-community/slider";
// import global from "../styles/globalStyles";

// const BrewEntryScreen = () => {
//   const navigation = useNavigation();

//   // --- State for all fields from your dummyBrew data model ---
//   // Note: When a bean is selected in the future, these should default to the last-used values for that bean.
//   const [beanName, setBeanName] = useState("");
//   const [dose, setDose] = useState(18.0);
//   const [yieldAmount, setYieldAmount] = useState(36);
//   const [brewTime, setBrewTime] = useState(30);
//   const [temperature, setTemperature] = useState(92);
//   const [grindSize, setGrindSize] = useState(7);
//   const [date, setDate] = useState(new Date().toLocaleDateString("en-GB")); // Defaults to today's date

//   // --- Tasting Profile State ---
//   const [aroma, setAroma] = useState(5);
//   const [acidity, setAcidity] = useState(5);
//   const [sweetness, setSweetness] = useState(5);
//   const [body, setBody] = useState(5);
//   const [bitterness, setBitterness] = useState(5);
//   const [overallRating, setOverallRating] = useState(5);
//   const [notes, setNotes] = useState("");

//   // --- Menu visibility state ---
//   const [beanMenuVisible, setBeanMenuVisible] = useState(false);

//   const handleSave = () => {
//     const brewData = {
//       beanName,
//       dose: parseFloat(dose.toFixed(1)),
//       yieldAmount,
//       brewTime,
//       temperature,
//       grindSize,
//       date,
//       tastingProfile: {
//         aroma,
//         acidity,
//         sweetness,
//         body,
//         bitterness,
//       },
//       overallRating: parseFloat(overallRating.toFixed(1)),
//       notes,
//     };
//     console.log("Saving Brew Data:", brewData);
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView contentContainerStyle={local.scrollContent} keyboardShouldPersistTaps="handled">
//             <View style={global.alignCenter}>
//               <Text style={global.headingL}>Add New Brew</Text>
//               <Text style={global.subheadingM}>Log your Espresso Recipe</Text>
//             </View>
//             <View style={global.spacerL} />

//             <Card style={local.card}>
//               <Card.Content>
//                 <Text style={local.cardTitle}>Recipe</Text>

//                 {/* This will eventually be populated with beans from your database */}
//                 <Menu
//                   visible={beanMenuVisible}
//                   onDismiss={() => setBeanMenuVisible(false)}
//                   contentStyle={{ backgroundColor: "#fffaf0" }}
//                   anchor={
//                     <Button
//                       icon="coffee-bean"
//                       mode="outlined"
//                       onPress={() => setBeanMenuVisible(true)}
//                       style={[local.input, { borderColor: "peru" }]}
//                       textColor="saddlebrown"
//                     >
//                       {beanName || "Select a Bean"}
//                     </Button>
//                   }
//                 >
//                   <Menu.Item
//                     onPress={() => {
//                       setBeanName("Mamba");
//                       setBeanMenuVisible(false);
//                     }}
//                     title="Mamba (3FE)"
//                   />
//                   <Menu.Item
//                     onPress={() => {
//                       setBeanName("Colombian Supremo");
//                       setBeanMenuVisible(false);
//                     }}
//                     title="Colombian Supremo (Cloud Picker)"
//                   />
//                 </Menu>

//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Dose: {dose.toFixed(1)}g</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={10}
//                     maximumValue={25}
//                     step={0.1}
//                     value={dose}
//                     onValueChange={setDose}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>

//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Yield: {yieldAmount.toFixed(0)}g</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={20}
//                     maximumValue={60}
//                     step={1}
//                     value={yieldAmount}
//                     onValueChange={setYieldAmount}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>

//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Time: {brewTime.toFixed(0)}s</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={15}
//                     maximumValue={45}
//                     step={1}
//                     value={brewTime}
//                     onValueChange={setBrewTime}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>

//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Temperature: {temperature}°C</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={85}
//                     maximumValue={100}
//                     step={1}
//                     value={temperature}
//                     onValueChange={setTemperature}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>

//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Grind Size: {grindSize}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={20}
//                     step={1}
//                     value={grindSize}
//                     onValueChange={setGrindSize}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>

//                 <TextInput
//                   label="Brew Date"
//                   value={date}
//                   onChangeText={setDate}
//                   style={local.input}
//                   mode="outlined"
//                   disabled
//                 />
//               </Card.Content>
//             </Card>

//             <Card style={local.card}>
//               <Card.Content>
//                 <Text style={local.cardTitle}>Tasting Profile</Text>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Aroma: {aroma}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={1}
//                     value={aroma}
//                     onValueChange={setAroma}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Acidity: {acidity}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={1}
//                     value={acidity}
//                     onValueChange={setAcidity}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Sweetness: {sweetness}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={1}
//                     value={sweetness}
//                     onValueChange={setSweetness}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Body: {body}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={1}
//                     value={body}
//                     onValueChange={setBody}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Bitterness: {bitterness}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={1}
//                     value={bitterness}
//                     onValueChange={setBitterness}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//               </Card.Content>
//             </Card>

//             <Card style={local.card}>
//               <Card.Content>
//                 <Text style={local.cardTitle}>Overall Rating & Notes</Text>
//                 <View style={local.input}>
//                   <Text style={local.sliderLabel}>Overall Rating: {overallRating.toFixed(1)}</Text>
//                   <Slider
//                     style={{ width: "100%", height: 40 }}
//                     minimumValue={1}
//                     maximumValue={10}
//                     step={0.5}
//                     value={overallRating}
//                     onValueChange={setOverallRating}
//                     minimumTrackTintColor="peru"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="peru"
//                   />
//                 </View>
//                 <TextInput
//                   label="Tasting Notes / Comments"
//                   value={notes}
//                   onChangeText={setNotes}
//                   style={local.input}
//                   mode="outlined"
//                   multiline
//                   numberOfLines={4}
//                 />
//               </Card.Content>
//             </Card>

//             <Button mode="contained" onPress={handleSave} style={local.button} buttonColor="peru">
//               Save Brew
//             </Button>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const local = StyleSheet.create({
//   scrollContent: { padding: 16, backgroundColor: "blanchedalmond" },
//   card: {
//     marginBottom: 20,
//     backgroundColor: "#fffaf0",
//   },
//   cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
//   input: {
//     marginBottom: 16,
//     backgroundColor: "#fffaf0",
//   },
//   button: { marginTop: 16, marginBottom: 60 },
//   sliderLabel: { fontSize: 16, color: "#333", marginBottom: 8 },
// });

// export default BrewEntryScreen;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, Menu, Card, List } from "react-native-paper";
import Slider from "@react-native-community/slider";
import global from "../styles/globalStyles";

const BrewEntryScreen = () => {
  const navigation = useNavigation();

  // Mandatory fields
  const [beanName, setBeanName] = useState("");
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

  // Menu visibility state
  const [beanMenuVisible, setBeanMenuVisible] = useState(false);
  const [optionalSectionExpanded, setOptionalSectionExpanded] = useState(false);

  const handleSave = () => {
    const brewData = {
      beanName,
      dose: parseFloat(dose.toFixed(1)),
      yieldAmount: parseFloat(yieldAmount.toFixed(1)),
      brewTime: parseFloat(brewTime.toFixed(1)),
      temperature: parseFloat(temperature.toFixed(1)),
      grindSize,
      rating: parseFloat(rating.toFixed(1)),
      date,
      tastingProfile: {
        aroma,
        acidity,
        sweetness,
        body,
        bitterness,
      },
      notes,
    };
    console.log("Saving Brew Data:", brewData);
    navigation.goBack();
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
                      {beanName || "Select a Bean"}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setBeanName("Mamba");
                      setBeanMenuVisible(false);
                    }}
                    title="Mamba (3FE)"
                  />
                  <Menu.Item
                    onPress={() => {
                      setBeanName("Colombian Supremo");
                      setBeanMenuVisible(false);
                    }}
                    title="Colombian Supremo (Cloud Picker)"
                  />
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

            {/* Potential 3rd Field - try more layouts later */}
            {/* <Card style={local.card}>
              <Card.Content>
                <Text style={local.cardTitle}>Tasting Profile (optional)</Text>
                
              </Card.Content>
            </Card> */}

            <List.Accordion
              title="Optional Feedback & Notes"
              titleStyle={local.accordionTitle}
              style={local.accordion}
              expanded={optionalSectionExpanded}
              onPress={() => setOptionalSectionExpanded(!optionalSectionExpanded)}
              left={(props) => <List.Icon {...props} icon="playlist-edit" color="saddlebrown" />}
            >
              <Card style={local.card}>
                <Card.Content>
                  {/* <Text style={local.cardTitle}>Optional Feedback/ Notes</Text> */}

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

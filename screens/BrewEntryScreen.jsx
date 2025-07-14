import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import global from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const BrewEntryScreen = () => {
  const navigation = useNavigation();

  const [beanName, setBeanName] = useState(""); // should instead be selected from list
  const [dose, setDose] = useState("");
  const [yieldAmount, setYieldAmount] = useState("");
  const [brewTime, setBrewTime] = useState("");
  const [temperature, setTemperature] = useState("");
  // const [method, setMethod] = useState("");
  const [grindSize, setGrindSize] = useState("");
  const [aromaRating, setAromaRating] = useState(0);
  const [sweetnessRating, setSweetnessRating] = useState(0);
  const [acidityRating, setAcidityRating] = useState(0);
  const [bitternessRating, setBitternessRating] = useState(0);
  const [bodyRating, setBodyRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // Placeholder logic — later save to Firebase
    console.log({
      beanName,
      dose,
      yieldAmount,
      brewTime,
      temperature,
      // method,
      grindSize,
      aromaRating,
      sweetnessRating,
      acidityRating,
      bitternessRating,
      bodyRating,
      overallRating,
      notes,
    });
    navigation.goBack(); // Placeholder - back to HomeScreen
  };

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={{ flex: 1, backgroundColor: "blanchedalmond" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* Input fields */}
            <ScrollView
              contentContainerStyle={local.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={global.alignCenter}>
                <Text style={global.headingL}>Add New Brew</Text>
                <Text style={global.subheadingM}>Log your Espresso Recipe</Text>
              </View>

              <View style={global.spacerL} />

              {/* Brewing Measurements */}
              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Coffee Beans</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. Mamba"
                  value={beanName}
                  onChangeText={setBeanName}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Dose (g) - Ground Coffee</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 18.5"
                  keyboardType="numeric"
                  value={dose}
                  onChangeText={setDose}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Yield (g) - Brewed Espresso</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 36"
                  keyboardType="numeric"
                  value={yieldAmount}
                  onChangeText={setYieldAmount}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Brew Time (s) - Including Pre-infusion</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 28"
                  keyboardType="numeric"
                  value={brewTime}
                  onChangeText={setBrewTime}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Temperature (°C)</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 94"
                  keyboardType="numeric"
                  value={temperature}
                  onChangeText={setTemperature}
                />
              </View>

              {/* <View style={global.inputWrapper}>
              <Text style={global.textLabelL}>Brew Method</Text>
              <TextInput
                style={global.inputField}
                placeholder="e.g. Espresso / Aeropress"
                value={method}
                onChangeText={setMethod}
              />
            </View> */}

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Grind Size</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 5 (on your grinder)"
                  value={grindSize}
                  onChangeText={setGrindSize}
                />
              </View>

              {/* Reflection */}
              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Aroma</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 1-10"
                  keyboardType="numeric"
                  value={aromaRating}
                  onChangeText={setAromaRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Sweetness</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 1-10"
                  keyboardType="numeric"
                  value={sweetnessRating}
                  onChangeText={setSweetnessRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Acidity</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 1-10"
                  keyboardType="numeric"
                  value={acidityRating}
                  onChangeText={setAcidityRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Bitterness</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 1-10"
                  keyboardType="numeric"
                  value={bitternessRating}
                  onChangeText={setBitternessRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Body</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 1-10"
                  keyboardType="numeric"
                  value={bodyRating}
                  onChangeText={setBodyRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Overall Rating (1-10)</Text>
                <TextInput
                  style={global.inputField}
                  placeholder="e.g. 8.5"
                  keyboardType="numeric"
                  value={overallRating}
                  onChangeText={setOverallRating}
                />
              </View>

              <View style={global.inputWrapper}>
                <Text style={global.textLabelL}>Notes</Text>
                <TextInput
                  style={[global.inputField, { height: 160 }]}
                  placeholder="Taste, technique, adjustments..."
                  multiline
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>

              <View style={local.buttonSpacing}>
                <Button title="Save Brew" onPress={handleSave} color="peru" />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  scrollContent: {
    padding: 10,
    backgroundColor: "blanchedalmond",
    flexGrow: 1,
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 80,
  },
});

export default BrewEntryScreen;

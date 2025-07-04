import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import global from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const BeanEntryScreen = () => {
  const navigation = useNavigation();

  const [beanName, setBeanName] = useState("");
  const [roaster, setRoaster] = useState("");
  const [origin, setOrigin] = useState("");
  const [roastDate, setRoastDate] = useState("");
  const [roastType, setRoastType] = useState("");
  const [rating, setRating] = useState("");

  const handleSave = () => {
    // Placeholder logic — later save to Firebase
    console.log({
      beanName,
      roaster,
      origin,
      roastDate,
      roastType,
      rating,
    });
    navigation.goBack(); // Placeholder - back to HomeScreen
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Input fields */}
      <ScrollView contentContainerStyle={local.scrollContent}>
        <View style={global.alignCenter}>
          <Text style={global.headingL}>Add New Bean</Text>
          <Text style={global.subheadingM}>Log your Espresso Bean Details</Text>
        </View>

        <View style={global.spacerL} />

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Bean Name</Text>
          <TextInput style={global.inputField} placeholder="e.g. Mamba" value={beanName} onChangeText={setBeanName} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roaster</Text>
          <TextInput style={global.inputField} placeholder="e.g. 3FE" value={roaster} onChangeText={setRoaster} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Origin</Text>
          <TextInput style={global.inputField} placeholder="e.g. Brazil" value={origin} onChangeText={setOrigin} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roast Date</Text>
          <TextInput style={global.inputField} placeholder="DD-MM-YYYY" value={roastDate} onChangeText={setRoastDate} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roast Type</Text>
          <TextInput
            style={global.inputField}
            placeholder="Light / Medium / Dark"
            value={roastType}
            onChangeText={setRoastType}
          />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Rating (1-10)</Text>
          <TextInput
            style={global.inputField}
            placeholder="e.g. 8.5"
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
          />
        </View>

        {/* Duplicating fields for scroll testing */}
        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Bean Name</Text>
          <TextInput style={global.inputField} placeholder="e.g. Mamba" value={beanName} onChangeText={setBeanName} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roaster</Text>
          <TextInput style={global.inputField} placeholder="e.g. 3FE" value={roaster} onChangeText={setRoaster} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Origin</Text>
          <TextInput style={global.inputField} placeholder="e.g. Brazil" value={origin} onChangeText={setOrigin} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roast Date</Text>
          <TextInput style={global.inputField} placeholder="DD-MM-YYYY" value={roastDate} onChangeText={setRoastDate} />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Roast Type</Text>
          <TextInput
            style={global.inputField}
            placeholder="Light / Medium / Dark"
            value={roastType}
            onChangeText={setRoastType}
          />
        </View>

        <View style={global.inputWrapper}>
          <Text style={global.textLabelL}>Rating (1-10)</Text>
          <TextInput
            style={global.inputField}
            placeholder="e.g. 8.5"
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
          />
        </View>

        <View style={local.buttonSpacing}>
          <Button title="Save Bean" onPress={handleSave} color="peru" />
        </View>
      </ScrollView>
    </View>
  );
};

const local = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: "blanchedalmond",
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 80,
  },
});

export default BeanEntryScreen;

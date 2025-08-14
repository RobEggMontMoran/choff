import React, { useState } from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerInput = ({ label, dateValue, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Called when the user selects a date
  const onChangeDate = (event, selectedDate) => {
    // Hide the picker on Android after selection
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    // Updates the date if a date is selected
    if (selectedDate) {
      onDateChange(selectedDate.toLocaleDateString("en-GB"));
    }
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
        {/* Ensures the whole input box area is tappable */}
        <View pointerEvents="none">
          <TextInput
            label={label}
            value={dateValue}
            style={local.input}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="calendar" />}
          />
        </View>
      </TouchableOpacity>

      {/* The Native Date Picker Component */}
      {showDatePicker && (
        <DateTimePicker
          value={dateValue ? new Date(dateValue.split("/").reverse().join("-")) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const local = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: "oldlace",
  },
});

export default DatePickerInput;

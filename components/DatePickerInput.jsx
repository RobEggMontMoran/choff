import React, { useState } from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerInput = ({ label, dateValue, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // helper function to safely convert whatever dateValue we receive into a valid js Date object
  const getSafeDate = () => {
    // Case 1: It's a Firebase Timestamp (from an existing bean)
    if (dateValue && typeof dateValue.toDate === "function") {
      return dateValue.toDate();
    }
    // Case 2: It's already a valid JS Date object (from a new bean)
    if (dateValue instanceof Date) {
      return dateValue;
    }
    // Case 3: It's undefined, null, or some other format (from an old bean)
    // In this case, we default to today's date.
    return new Date();
  };

  const currentDate = getSafeDate();

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Always hides the picker after an action
    // Only update the state if the user actually selected a date (didn't press cancel)
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            // Displays the date in a readable format
            value={currentDate.toLocaleDateString("en-GB")}
            style={local.input}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="calendar" />}
          />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={currentDate} // Using the converted date object
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

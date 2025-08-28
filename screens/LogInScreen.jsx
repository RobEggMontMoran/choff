import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import global from "../styles/globalStyles";
import { loginUser, sendPasswordReset } from "../src/firebase/auth";

/**
 * The LogInScreen serves as the entry point for all new and unauthenticated users
 * It provides fields for email and password, a login handler,
 * a password reset function, and navigation to the Create Account screen
 */
const LogInScreen = () => {
  const navigation = useNavigation();

  // State to manage user input and submission status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles the user login attempt
  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    try {
      setIsSubmitting(true);
      // The onAuthStateChanged listener in StackNavigator handles successful navigation
      await loginUser(email, password);
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      // Provide more specific, user-friendly error messages for common auth failures
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        errorMessage = "Invalid email or password. Please try again.";
      }
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles the "Forgot Password" flow
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Email Required", "Please enter your email address in the email field first.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPasswordReset(email);
      // A generic success message is shown for security
      // This prevents revealing whether an email address is registered with the service or not
      Alert.alert(
        "Password Reset Email Sent",
        `If an account exists for ${email}, a reset link has been sent. Please check your inbox.`,
      );
    } catch (err) {
      // Also show a generic message on error for the same security reason
      Alert.alert(
        "Password Reset Email Sent",
        `If an account exists for ${email}, a reset link has been sent. Please check your inbox.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={global.screenCentered}>
      <View style={global.alignCenter}>
        <Text style={global.headingXL}>CHOFF</Text>
        <Text style={global.subheadingL}>Your Daily Brew Companion</Text>
      </View>

      <View style={global.spacerXL} />

      {/* Email Input */}
      <View style={global.inputWrapper}>
        <Text style={global.textLabelL}>Email Address</Text>
        <TextInput
          style={global.inputField}
          placeholder="Enter email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={global.inputWrapper}>
        <Text style={global.textLabelL}>Password</Text>
        <TextInput
          style={global.inputField}
          placeholder="Enter password"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Forgot Password Button */}
      <TouchableOpacity onPress={handleForgotPassword} disabled={isSubmitting}>
        <Text style={local.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <View style={local.buttonMargin}>
        <Button
          title={isSubmitting ? "Logging In..." : "Log In"}
          onPress={handleLogin}
          color="peru"
          disabled={isSubmitting}
        />
      </View>

      {/* Navigation to Create Account Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")} disabled={isSubmitting}>
        <Text style={local.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  buttonMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "saddlebrown",
    textAlign: "right",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  createAccountText: {
    color: "saddlebrown",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default LogInScreen;

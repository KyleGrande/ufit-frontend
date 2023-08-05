import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { loginStyles } from "../style";
import Logo from "../../components/ufitsvg";
import LinearGradient from "../../components/LinearGradient";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../UserAuth";
import { IUser } from "../../interface/IUser";
import { insertUser } from "../../service/apiCall";
import { SafeAreaView } from "react-native-safe-area-context";

interface SignupScreenProps {
  route: RouteProp<StackParamList, "Signup">;
  navigation: NativeStackNavigationProp<StackParamList, "Signup">;
}

export default function SignupScreen({ route, navigation }: SignupScreenProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const validateFields = () => {
    if (userName.trim() === "" || password.trim() === "") {
      Alert.alert("Invalid input", "Please enter a valid userName.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Invalid input", "Please enter a valid email.");
      return false;
    }

    const phonePattern = /^\(?(\d{3})\)?(\d{3})?(\d{4})$/;
    if (!phonePattern.test(phoneNumber)) {
      Alert.alert("Invalid input", "Please enter a valid phone number.");
      return false;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      Alert.alert(
        "Invalid password",
        "Your password needs to be 8 characters long and include at least one capital letter, one number, and one special character."
      );
      return false;
    }

    if (!(firstName.length > 0)) {
      Alert.alert(
        "Invalid input",
        "First Name must have at least 1 character."
      );
      return false;
    }

    if (!(lastName.length > 0)) {
      Alert.alert("Invalid input", "Last Name must have at least 1 character.");
      return false;
    }

    if (!(userName.length > 2)) {
      Alert.alert(
        "Invalid input",
        "User Name must have at least 3 characters."
      );
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateFields()) return;

    const payload: Partial<IUser> = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      userName,
    };

    try {
      const response: any = await insertUser(payload);
      if (!response?.success) {
        Alert.alert(
          "Failure",
          response?.message || "Please enter valid username and password"
        );
        return;
      }
      Alert.alert("Success", "Signed up");
    } catch (error) {
      Alert.alert("Exception", "Please try again");
    }
  };

  return (
    <LinearGradient
      top="#FCC064"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >
      <View
        style={{
          marginTop: 0,
          marginLeft: 35,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollView>
          {/* <View> */}
          <SafeAreaView>
            <KeyboardAvoidingView>
              <View
                style={{
                  height: 350,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: -50,
                  marginTop: -100,
                  marginLeft: -30,
                  paddingLeft: 0,
                }}
              >
                <Logo />
              </View>

              {/* <SafeAreaView> */}
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
              />
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                autoComplete="name"
              />
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                autoComplete="name-family"
              />
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
                autoComplete="username"
              />
              <TextInput
                style={loginStyles.inputContainer}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoComplete="password-new"
              />

              <TouchableOpacity onPress={handleSignup} style={{ width: "90%" }}>
                <View style={loginStyles.buttonContainer}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Signup
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Already have an account? Log in here!</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

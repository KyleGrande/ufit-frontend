import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { userSetting, loginStyles } from "../style";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../UserAuth";
import SignupScreen from "./SignupScreen";
import { RouteProp } from "@react-navigation/native";
import LinearGradient from "../../components/LinearGradient";
import Logo from "../../components/ufitsvg";
import { authLogin } from "../../service/apiCall";
import { IUser } from "../../interface/IUser";
// import {AsyncStorage} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

// used for calling navigation ina type safe way
interface LoginScreenProps {
  route: RouteProp<StackParamList, "Login">;
  navigation: NativeStackNavigationProp<StackParamList, "Login">;
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginScreen({ route, navigation }: LoginScreenProps) {
  const setIsLoggedIn = route.params.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check if the username and password are valid
    try {
      // Generate a unique token
      const payload: Partial<IUser> = { email: username, password };
      const response: any = await authLogin(payload);
      if (!response?.success) {
        Alert.alert(
          "Failure",
          response?.message || "Please enter valid username and password"
        );
        return;
      }

      await AsyncStorage.setItem("token", response?.token || null);
      setIsLoggedIn(true);
      // navigation.navigate('Home');

      // Navigate to the authenticated screen
      // You can use navigation library like React Navigation for this
      // navigation.navigate('Home');
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
      <View style={loginStyles.viewContainer}>
        <View
          style={{
            height: 350,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: -70,
            marginTop: -300,
          }}
        >
          <Logo />
        </View>
        <TextInput
          style={loginStyles.inputContainer}
          placeholder="E-mail"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={loginStyles.inputContainer}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} /> */}
        <TouchableOpacity onPress={handleLogin} style={{ width: "90%" }}>
          <View style={loginStyles.buttonContainer}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text>Don't have an account? Sign up here!</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { programStyles, styles, userSetting } from "./style";
import LinearGradient from "../components/LinearGradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../hook/useAuth";
import { IUser } from "../interface/IUser";
import { updateUser } from "../service/apiCall";

export default function UserSettings({ setIsLoggedIn }: any) {
  let isIos = false;
  if (Platform.OS === "ios") isIos = true;

  const [resetPasswordFields, setResetPasswordFields] = useState({
    // email:"",
    password: "",
    reEnterPassword: "",
  });

  const [resetPassword, setResetPassword] = useState(false);
  const { email, userName, _id } = useAuth();

  const handleLogout = async () => {
    console.log("logout start");
    await AsyncStorage.clear();
    console.log("storage cleared");
    setIsLoggedIn(false);
    console.log("logout finished");
  };

  const handleResetPassword = async () => {
    try {
      if (
        resetPasswordFields.password !== resetPasswordFields.reEnterPassword
      ) {
        Alert.alert(
          "Validation Error",
          "Both password and re enter password must match"
        );
        return;
      }

      if (resetPasswordFields.password.length < 8) {
        Alert.alert("Validation Error", "Password must be 8 chars long");
        return;
      }
      const payload: Partial<IUser> = {
        _id,
        password: resetPasswordFields.password,
      };
      const response: any = await updateUser(payload);
      if (!response?.success) {
        Alert.alert("Failure", response?.message);
        return;
      }

      Alert.alert("Success", "password updated");
      setResetPassword(false);
    } catch (error) {
      Alert.alert("Exception", "Please try again");
    }
  };

  const deleteDialog = () =>
    Alert.alert("Confirm Operation", "Are you sure you want to logout?", [
      { text: "Cancel" },
      { text: "Yes", onPress: handleLogout },
    ]);

  return (
    <LinearGradient
      top="#FCC064"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >
      <View style={{ ...styles.viewContainer, flex: 1 }}>
        <Text style={{ ...styles.titleBarText, color: "#ffffff" }}>
          Settings
        </Text>

        <Text style={{ ...userSetting.settingText, marginTop: 18 }}>Email</Text>
        <Text style={userSetting.settingText}>{email}</Text>

        <Text style={{ ...userSetting.settingText, marginTop: 12 }}>
          Username
        </Text>
        <Text style={userSetting.settingText}> {userName}</Text>

        {/* Reset form */}
        {resetPassword && (
          <View>
            <TextInput
              style={{
                ...userSetting.textInput,
                ...userSetting.inputContainer,
              }}
              placeholder="New Password"
              placeholderTextColor={"#ffffff"}
              secureTextEntry={true}
              value={resetPasswordFields.password}
              onChangeText={(value) =>
                setResetPasswordFields((prev) => ({ ...prev, password: value }))
              }
            ></TextInput>
            <TextInput
              style={{
                ...userSetting.textInput,
                ...userSetting.inputContainer,
                marginTop: 5,
              }}
              placeholder="Confirm Password"
              placeholderTextColor={"#ffffff"}
              secureTextEntry={true}
              value={resetPasswordFields.reEnterPassword}
              onChangeText={(value) =>
                setResetPasswordFields((prev) => ({
                  ...prev,
                  reEnterPassword: value,
                }))
              }
            ></TextInput>
          </View>
        )}

        <View
          style={{
            ...programStyles.touchableOpacityStyle,
            marginTop: 90,
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (resetPassword) handleResetPassword();
              else setResetPassword(true);
            }}
          >
            <Text
              style={{
                color: "#ebe2e2",
                backgroundColor: "#000",
                fontWeight: "bold",
                padding: 12,
                borderRadius: isIos ? 10 : 10,
                opacity: 0.7,
                borderWidth: 1,
                overflow: "hidden",
              }}
            >
              {resetPassword ? "Submit" : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style></View> */}

        <View
          style={{
            ...programStyles.touchableOpacityStyle,
            marginTop: 90,
            position: "absolute",
          }}
        >
          <TouchableOpacity onPress={deleteDialog}>
            <Text
              style={{
                color: "#ebe2e2",
                backgroundColor: "#000",
                fontWeight: "bold",
                padding: 12,
                borderRadius: isIos ? 10 : 10,
                opacity: 0.7,
                borderWidth: 1,
                overflow: "hidden",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { programStyles, styles, userSetting } from "./style";
import LinearGradient from "../component/LinearGradient";

export default function UserSettings() {
  let isIos = false;
  if (Platform.OS === "ios") isIos = true;

  const [resetPasswordFields, setResetPasswordFields] = React.useState({
    // email:"",
    password: "",
    reEnterPassword: "",
  });

  const [resetPassword, setResetPassword] = React.useState(false);

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
        <Text style={userSetting.settingText}>Email@gmail.com</Text>

        <Text style={{ ...userSetting.settingText, marginTop: 12 }}>
          Username
        </Text>
        <Text style={userSetting.settingText}>Kylegrande</Text>

        {/* Reset form */}
        {resetPassword && (
          <View>
            <TextInput
              style={{
                ...userSetting.textInput,
                ...userSetting.inputContainer,
              }}
              placeholder="Password"
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
              placeholder="Re Enter Password"
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
              setResetPassword(true);
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
          <TouchableOpacity
          // onPress={() => navigation.navigate("Create a Program")}
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
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

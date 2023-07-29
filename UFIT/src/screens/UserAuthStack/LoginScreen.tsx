import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { userSetting, loginStyles } from '../style';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserAuth';
import SignupScreen from './SignupScreen';
import { RouteProp } from '@react-navigation/native';
import LinearGradient from '../../components/LinearGradient';
import Logo from '../../components/ufitsvg';

// used for calling navigation ina type safe way
interface LoginScreenProps {
  route: RouteProp<StackParamList, 'Login'>;
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginScreen({ route, navigation }: LoginScreenProps) {
  const setIsLoggedIn = route.params.setIsLoggedIn;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the username and password are valid
    if (username === 'Admin' && password === 'password') {
      // Generate a unique token
      const token = generateToken();
      setIsLoggedIn(true);
    

      // Navigate to the authenticated screen
      // You can use navigation library like React Navigation for this
      // navigation.navigate('Home');
    } else {
      Alert.alert('Invalid credentials', 'Please enter valid username and password');
    }
  };

  const generateToken = () => {
    // Generate a random token using a library like `uuid` or any other method
    const token = 'RANDOM_TOKEN';

    // Check if the token already exists in storage to avoid repetition

    return token;
  };

  return (
    <LinearGradient
    top="#FCC064"
    bottom="#EA9CFD"
    style={{ minHeight: "100%" }}
  >
    <View style={loginStyles.viewContainer}>
      <View style={{height:350, alignItems: 'center', justifyContent: 'center', marginBottom: -70, marginTop: -300}}>
        <Logo />
      </View>
      <TextInput
        style={loginStyles.inputContainer}
        placeholder="Username"
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
      <TouchableOpacity 
        onPress={handleLogin}
        style={{width: '90%'}} 
      >
        <View style={loginStyles.buttonContainer}>
          <Text
          style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')} 
      >
        <Text>Don't have an account? Sign up here!</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};
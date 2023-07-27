import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import {loginStyles} from '../style';
import Logo from '../../components/ufitsvg';
import LinearGradient from '../../components/LinearGradient';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserAuth';

interface SignupScreenProps {
  route: RouteProp<StackParamList, 'Signup'>;
  navigation: NativeStackNavigationProp<StackParamList, 'Signup'>;
}

export default function SignupScreen({ route, navigation }: SignupScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  

  const handleSignup = () => {
    // Check if the username and password meet your requirements
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid input', 'Please enter a valid username and password');
    } else {
      // Check if the username is already taken
      const isUsernameTaken = checkUsernameTaken(username);

      if (isUsernameTaken) {
        Alert.alert('Username taken', 'Please choose a different username');
      } else {
        // Save the username and password to your database or storage

        Alert.alert('Sign up successful', 'You can now log in with your new account');
      }
    }
  };

  const checkUsernameTaken = (username: string) => {
    // Check if the username already exists in your database or storage

    return false; // Return `true` if the username is taken
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
        placeholder="First Name"
        value={firstName}
        onChangeText={setUsername}
      />
      <TextInput
        style={loginStyles.inputContainer}
        placeholder="Last Name"
        secureTextEntry
        value={lastName}
        onChangeText={setPassword}
      />
        <TextInput
        style={loginStyles.inputContainer}
        placeholder="Phone Number"
        secureTextEntry
        value={phoneNumber}
        onChangeText={setPassword}
      />
        <TextInput
        style={loginStyles.inputContainer}
        placeholder="Email"
        secureTextEntry
        value={email}
        onChangeText={setPassword}
      />
        <TextInput
        style={loginStyles.inputContainer}
        placeholder="Username"
        secureTextEntry
        value={username}
        onChangeText={setPassword}
      />
        <TextInput
        style={loginStyles.inputContainer}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        onPress={handleSignup}
        style={{width: '90%'}} 
      >
        <View style={loginStyles.buttonContainer}>
          <Text
          style={{color: 'white', fontWeight: 'bold'}}>Signup</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')} 
      >
        <Text>Already have an account? Log in here!</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

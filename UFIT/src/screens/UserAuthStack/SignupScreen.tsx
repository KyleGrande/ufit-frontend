import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const SignupScreen: React.FC = () => {
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
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;

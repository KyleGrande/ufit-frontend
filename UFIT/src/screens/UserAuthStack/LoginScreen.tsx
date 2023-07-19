import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { creatingStyles } from '../style';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserAuth';
import SignupScreen from './SignupScreen';
import { RouteProp } from '@react-navigation/native';

// used for calling navigation ina type safe way
interface LoginScreenProps {
  route: RouteProp<StackParamList, 'Login'>;
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginScreen({ route, navigation, setIsLoggedIn }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the username and password are valid
    if (username === 'admin' && password === 'password') {
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
    <View style={creatingStyles.viewContainer}>
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

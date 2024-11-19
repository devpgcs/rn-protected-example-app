import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

import {useAuth} from '../../contexts/auth';

import User from '../../api/models/user.model';
import WrapperView from '../../components/wrapper';

import {PublicStackParamList} from './router';

export default function RegisterScreen({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, 'register'>) {
  const [payload, setPayload] = useState<Omit<User, 'id' | 'role'>>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const {register} = useAuth();

  const handleInput =
    (key: keyof Omit<User, 'id' | 'role'>) => (value: string) => {
      setPayload(prev => ({...prev, [key]: value}));
    };

  const handleRegister = () => {
    try {
      register(payload);

      Alert.alert('Success!', 'User registered successfully!', [
        {onPress: () => navigation.navigate('login')},
      ]);
    } catch (error) {
      Alert.alert('Oops!', (error as Error).message);
    }
  };

  const moveToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <WrapperView style={styles.container}>
      <Text style={styles.title}>Let's rock!</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="First name"
          autoComplete="name-given"
          autoCapitalize="words"
          value={payload.firstName}
          onChangeText={handleInput('firstName')}
        />
        <TextInput
          placeholder="Last name"
          autoComplete="name-family"
          autoCapitalize="words"
          value={payload.lastName}
          onChangeText={handleInput('lastName')}
        />
        <TextInput
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={payload.email}
          onChangeText={handleInput('email')}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={payload.password}
          onChangeText={handleInput('password')}
          onSubmitEditing={handleRegister}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Register" onPress={handleRegister} />
        <Button title="Login" onPress={moveToLogin} />
      </View>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputsContainer: {
    gap: 16,
  },
  buttonsContainer: {
    gap: 8,
  },
});

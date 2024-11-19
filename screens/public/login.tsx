import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

import {useAuth} from '../../contexts/auth';

import WrapperView from '../../components/wrapper';

import {PublicStackParamList} from './router';

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, 'login'>) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {login} = useAuth();

  const handleLogin = () => {
    try {
      login(email, password);
    } catch (error) {
      Alert.alert('Oops!', (error as Error).message);
    }
  };

  const moveToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <WrapperView style={styles.container}>
      <Text style={styles.title}>Let's rock!</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={moveToRegister} />
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

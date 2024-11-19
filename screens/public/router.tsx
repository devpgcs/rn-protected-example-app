import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './login';
import RegisterScreen from './register';

export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};

const PublicStack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicRouter() {
  return (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name="login"
        component={LoginScreen}
        options={{headerTitle: 'Login'}}
      />
      <PublicStack.Screen
        name="register"
        component={RegisterScreen}
        options={{headerTitle: 'Register'}}
      />
    </PublicStack.Navigator>
  );
}

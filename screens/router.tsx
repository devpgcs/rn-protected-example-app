import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth} from '../contexts/auth';

import PrivateRouter from './private/router';
import PublicRouter from './public/router';

export type RootStackParamList = {
  private: undefined;
  public: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootRouter() {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <RootStack.Screen name="private" component={PrivateRouter} />
        ) : (
          <RootStack.Screen name="public" component={PublicRouter} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

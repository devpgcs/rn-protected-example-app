import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useAuth} from '../../contexts/auth';

import UserRole from '../../api/enums/user-role.enum';

import HomeScreen from './home';
import TodosScreen from './todos';
import BillingScreen from './billing';
import SettingsScreen from './settings';

type PrivateStackParamList = {
  home: undefined;
  todos: undefined;
  billing: undefined;
  settings: undefined;
};

const PrivateStack = createBottomTabNavigator<PrivateStackParamList>();

export default function PrivateRouter() {
  const {user} = useAuth();

  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name="home"
        component={HomeScreen}
        options={{headerTitle: 'Home'}}
      />

      {user?.role === UserRole.Admin && (
        <PrivateStack.Group>
          <PrivateStack.Screen
            name="todos"
            component={TodosScreen}
            options={{headerTitle: 'To-dos'}}
          />
          <PrivateStack.Screen
            name="billing"
            component={BillingScreen}
            options={{headerTitle: 'Billing'}}
          />
        </PrivateStack.Group>
      )}

      <PrivateStack.Screen
        name="settings"
        component={SettingsScreen}
        options={{headerTitle: 'Settings'}}
      />
    </PrivateStack.Navigator>
  );
}

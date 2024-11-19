import {Button} from 'react-native';

import {useAuth} from '../../contexts/auth';

import WrapperView from '../../components/wrapper';

export default function SettingsScreen() {
  const {logout} = useAuth();

  return (
    <WrapperView>
      <Button title="Logout" onPress={logout} />
    </WrapperView>
  );
}

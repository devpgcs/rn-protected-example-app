import {StyleSheet, Text, View} from 'react-native';

import WrapperView from '../../components/wrapper';
import {useAuth} from '../../contexts/auth';

export default function HomeScreen() {
  const {user} = useAuth();

  return (
    <WrapperView style={{gap: 32}}>
      <Text style={styles.header}>
        Welcome, {user?.firstName} {user?.lastName}
      </Text>

      <View style={styles.sectionsContainer}>
        <Text style={styles.subHeader}>Important!</Text>

        <Text>
          You're able to create a new user but, it will be stored only in
          memory. Saying that... if you refresh the app, the user will be gone.
        </Text>
      </View>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionsContainer: {
    gap: 16,
  },
});

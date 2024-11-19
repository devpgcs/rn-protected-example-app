import React from 'react';

import AuthProvider from './contexts/auth';
import RootRouter from './screens/router';
import {SafeAreaView} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthProvider>
        <RootRouter />
      </AuthProvider>
    </SafeAreaView>
  );
}

export default App;

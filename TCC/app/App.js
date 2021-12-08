import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text  } from 'react-native';
import AppNavigator from './src/app.navigator';
import Home from './src/screen/Home'

//Inicia a aplicação
export default function App() {

  return (
    <View style={[styles.container, styles.droidSafeArea]}>
      <AppNavigator>
        <Home />
      </AppNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
},
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Ui = ({ navigation, currentUser }) => {
  const Tab = createBottomTabNavigator();

  let id;

  if (Array.isArray(currentUser[currentUser.length - 1])) {
    id = currentUser[currentUser.length - 1][0].id;
    console.log(currentUser);
  } else {
    id = currentUser[currentUser.length - 1].id;
  }

  return (
    <>
      <View style={[styles.uiBox, styles.cyan]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Form');
          }}
        >
          <Text style={styles.uiText}>Form</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.blue]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Entries');
          }}
        >
          <Text style={styles.uiText}>Entries</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.magenta]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}
        >
          <Text style={styles.uiText}>Search Bar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.orange]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Analysis');
          }}
        >
          <Text style={styles.uiText}>Analysis of Entries</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.grey]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Overview');
          }}
        >
          <Text style={styles.uiText}>Overview </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Ui;

const styles = StyleSheet.create({
  uiBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uiText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cyan: {
    backgroundColor: '#2aa198',
  },
  blue: {
    backgroundColor: '#268bd2',
  },
  magenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
  grey: {
    backgroundColor: 'grey',
  },
});

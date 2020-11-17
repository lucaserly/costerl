import React, { useState, useEffect } from 'react';
import { View, Alert, Button, Text, TextInput, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Lucas () {
  console.log('INSIDE LUCAS-->');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lucas!</Text>
    </View>
  );
}


const Tabs = () => {
  console.log('INSIDE tabs-->');
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lucas" component={Lucas} />
    </Tab.Navigator>
  );
};

export default Tabs;


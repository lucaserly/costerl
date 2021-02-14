import React from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView,
} from 'react-native';
import styles from './styles';

const Home = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>COSTERL</Text>
        <View style={styles.loginBox}>
          <TouchableOpacity onPress={() => {
            // resetUser();
            navigation.navigate('Login');
          }}
          >
            <Text style={styles.loginText}>Navigate to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

import React from 'react';
import { View } from 'react-native';
import Form from '../components/form/Form';
import config from '../config';

const ExForm = ({ postOne }) => {
  return (
    <View>
      <Form form={config.inputForm} postOne={postOne} />
    </View>
  );
};

export default ExForm;
import React from 'react';
import { Text } from 'react-native';
import AnalysisC from './../../components/Analysis';

const Analysis = ({ userEntries }) => {
  return (
    <>
      <AnalysisC entries={userEntries} />
    </>
  );
};

export default Analysis;

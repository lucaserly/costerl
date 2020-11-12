import React from 'react';
import { Text } from 'react-native';
import AnalysisC from './../../components/analysis/Analysis';

const Analysis = ({ entries }) => {
  return (
    <>
      <Text>Hello from Analysis</Text>
      <AnalysisC entries={entries} />
    </>
  );
};

export default Analysis;
import React from 'react';
import { Text } from 'react-native';
import AnalysisC from './../../components/analysis/Analysis';

const Analysis = ({ entries }) => {
  return (
    <>
      <AnalysisC entries={entries} />
    </>
  );
};

export default Analysis;
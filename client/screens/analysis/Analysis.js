import React from 'react';
import Analytics from '../../components/Analytics/Analytics';

const Analysis = ({ userEntries }) => {
  return (
    <>
      <Analytics entries={userEntries} />
    </>
  );
};

export default Analysis;

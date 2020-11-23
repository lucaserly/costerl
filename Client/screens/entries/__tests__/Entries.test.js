import React from 'react';
import { render } from '@testing-library/react-native';
import Entries from '../Entries';

describe('Entries', () => {
  test('snapshot', () => {
    const { toJSON } = render(<Entries />);
    expect(toJSON()).toMatchSnapshot();
  });
});

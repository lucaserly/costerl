import React from 'react';
import { render } from 'test-utils';
import { debug } from '@testing-library/react-native';
import Login from '../Login';

describe('Login', () => {
  test('render Login form', () => {
    const { debug } = render(<Login />);
    debug();
  });

  // test('input fields and buttons displayed', () => {

  // });
});

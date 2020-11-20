import React from 'react';
// import { render } from 'test-utils';
import { debug, render, screen } from '@testing-library/react-native';
// import { screen } from '@testing-library/dom'
import Login from '../Login';

describe('Login', () => {
  test('render Login form', () => {
    const { debug } = render(<Login />);
    debug();
  });

  test ('snapshot', () => {
    const {toJSON} = render(<Login/>);
    expect(toJSON()).toMatchSnapshot();
  })

  test('displays buttons text', () => {
    const { getByText } = render(<Login/>)
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  })

  

});

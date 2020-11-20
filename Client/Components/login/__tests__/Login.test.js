import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../Login';
//import { onChange } from 'react-native-reanimated';


describe('Login', () => {
  test('render Login form', () => {
    const { debug } = render(<Login />);
    debug();
  });

  test ('snapshot', () => {
    const {toJSON} = render(<Login/>);
    expect(toJSON()).toMatchSnapshot();
  })

  test ('displays input fields', () => {
    const { getByPlaceholderText } = render(<Login/>)
    expect (getByPlaceholderText('Type email')).toBeTruthy();
    expect (getByPlaceholderText('password')).toBeTruthy();

    // fireEvent.change(input, { target: { value: '' } })
    // expect(input.value).toBe('$23.0')
  })

  test('displays buttons text', () => {
    const { getByText } = render(<Login/>)
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  })

  test('calls "handleSubmit" when clicking on submit button', () => {

    const mockOnClick = jest.fn();
        const { getByText, getByPlaceholderText } = render(
          <Login postUser={mockOnClick}>
          </Login>
        );
         fireEvent.changeText(getByPlaceholderText('password'), "mypassword");
         fireEvent.changeText(getByPlaceholderText('Type email'), "john@doe.com");
         fireEvent(getByText('Register'), 'click', {preventDefault: jest.fn()});
         expect(mockOnClick).toHaveBeenCalledTimes(1);
  })

// handleSubmit fires alert if empty

});

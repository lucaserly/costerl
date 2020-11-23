import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  test('snapshot', () => {
    const { toJSON } = render(<LoginForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('displays input fields', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    expect(getByPlaceholderText('Type email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
  });

  test('displays buttons text', () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  test('calls "handleSubmit" when clicking on submit button', () => {
    const mockOnClick = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginForm registerUser={mockOnClick}></LoginForm>);
    fireEvent.changeText(getByPlaceholderText('password'), 'mypassword');
    fireEvent.changeText(getByPlaceholderText('Type email'), 'john@doe.com');
    fireEvent(getByText('Register'), 'click', { preventDefault: jest.fn() });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('returns error when password field is empty', () => {
    const mockOnClick = jest.fn();
    jest.spyOn(Alert, 'alert');

    const { getByText, getByPlaceholderText } = render(<LoginForm registerUser={mockOnClick}></LoginForm>);
    fireEvent.changeText(getByPlaceholderText('password'), '');
    fireEvent.changeText(getByPlaceholderText('Type email'), 'john@doe.com');
    fireEvent(getByText('Register'), 'click', { preventDefault: jest.fn() });
    expect(Alert.alert).toHaveBeenCalled();
  });

  test('returns error when email field is empty', () => {
    const mockOnClick = jest.fn();
    jest.spyOn(Alert, 'alert');

    const { getByText, getByPlaceholderText } = render(<LoginForm registerUser={mockOnClick}></LoginForm>);
    fireEvent.changeText(getByPlaceholderText('password'), 'test');
    fireEvent.changeText(getByPlaceholderText('Type email'), '');
    fireEvent(getByText('Register'), 'click', { preventDefault: jest.fn() });
    expect(Alert.alert).toHaveBeenCalled();
  });

  // handleSubmit fires alert if empty
});

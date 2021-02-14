/* eslint-disable import/prefer-default-export */
import React from 'react';
import { UserProvider } from './UserProvider';
import { AuthProvider } from './AuthProvider';
import { ExpensesProvider } from './ExpensesProvider';
import RootStack from '../RootStack';

export const Providers = () => (
  <AuthProvider>
    <UserProvider>
      <ExpensesProvider>
        <RootStack />
      </ExpensesProvider>
    </UserProvider>
  </AuthProvider>
);

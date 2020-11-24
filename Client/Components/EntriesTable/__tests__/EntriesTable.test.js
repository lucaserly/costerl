import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EntriesTable from '../EntriesTable.tsx';

const mockEntries = [
  {
    amount: '1',
    category: 'Food',
    createdAt: '2020-11-20T10:44:18.662Z',
    currency: 'USD',
    date: '2020-11-20T10:44:18.662Z',
    description: 'Really good pizza',
    flag: true,
    id: 1,
    item: 'Pizza',
    payment: 5,
    updatedAt: '2020-11-20T10:44:18.662Z',
    userId: 1,
  },
  {
    amount: '2',
    category: 'Food',
    createdAt: '2020-11-20T10:44:18.662Z',
    currency: 'USD',
    date: '2020-11-20T10:44:18.662Z',
    description: 'Really good risotto',
    flag: true,
    id: 1,
    item: 'Risotto',
    payment: 10,
    updatedAt: '2020-11-20T10:44:18.662Z',
    userId: 1,
  },
];

describe('EntriesTable', () => {
  test('snapshot', () => {
    const { toJSON } = render(<EntriesTable userEntries={mockEntries} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('displays table header when input is empty', () => {
    const { getByText } = render(<EntriesTable userEntries={[]} />);
    expect(getByText('id')).toBeTruthy();
    expect(getByText('item')).toBeTruthy();
    expect(getByText('category')).toBeTruthy();
    expect(getByText('amount')).toBeTruthy();
    expect(getByText('delete')).toBeTruthy();
  });

  test('displays table header when input not empty', () => {
    const { getByText } = render(<EntriesTable userEntries={mockEntries} />);
    expect(getByText('id')).toBeTruthy();
    expect(getByText('item')).toBeTruthy();
    expect(getByText('category')).toBeTruthy();
    expect(getByText('amount')).toBeTruthy();
    expect(getByText('delete')).toBeTruthy();
  });

  test('displays correct entries', () => {
    const { getByText, getAllByText } = render(<EntriesTable userEntries={mockEntries} />);
    expect(getAllByText('Food').length).toBe(2);
    expect(getByText('Pizza')).toBeTruthy();
    expect(getByText('Risotto')).toBeTruthy();
  });

  test('calls delete button', () => {
    const mockOnClick = jest.fn();
    const { getAllByText } = render(<EntriesTable userEntries={mockEntries} deleteOne={mockOnClick} />);
    fireEvent(getAllByText('🗑')[0], 'click', { preventDefault: jest.fn() });
  });
});

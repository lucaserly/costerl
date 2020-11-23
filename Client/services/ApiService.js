import { Alert } from 'react-native';

const BASE_URL = 'http://10.197.0.223:3002';

const getAll = (end) => {
  return fetcher(end);
};

export const postEntryRequest = (entry) => {
  return fetcher('/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry)
  });
  
};

const deleteOne = (id) => {
  return fetcher(`entries/${id}`, {
    method: 'DELETE',
  });
};

const getAllUsers = () => {
  return fetcher('/users');
};

export const registerUserRequest = (user) => {
  return fetcher('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const loginUserRequest = (user) => {
  return fetcher('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const getUserEntries = (id) => {
  // console.log('end', end);
  console.log('id inside userEntries', id);
  return fetcher(`/users/${id}`);
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .then((res) => (res.status === 400 ? Alert.alert('Username already taken') : res))
    .then((res) => (res.status === 401 ? Alert.alert('User does not exist') : res))
    .catch((err) => {
      console.error('fetch request didnt work :( Error: ', err);
    });
};

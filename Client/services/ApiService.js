import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.178.77:3002';

const getAll = (end) => {
  return fetcher(end);
};

const postOne = (entry, end, id) => {
  entry.userId = id;

  return fetcher(end, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
};

const deleteOne = (id) => {
  return fetcher(`entries/${id}`, {
    method: 'DELETE',
  });
};

const getAllUsers = (end) => {
  return fetcher(end);
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

export const profile = (end, id) => {
  return fetcher(`${end}/${id}`);
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .then((res) => (res.status === 400 ? Alert.alert('Username already taken') : res))
    .catch((err) => {
      console.error('fetch request didnt work :( Error: ', err);
    });
};

// export default {
//   getAll,
//   postOne,
//   deleteOne,
//   getAllUsers,
//   createUser,
//   login,
//   profile,
// };

// const BASE_URL = 'http://192.168.1.19:3002/';
const BASE_URL = 'http://192.168.178.77:3002/';

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

const createUser = (user) => {
  console.log('createUser getting called with', user);
  // return fetcher('/register', {
  //   method: 'POST',
  //   header: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(user),
  // });
};

const login = (user, end) => {
  return fetcher(end, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

const profile = (end, id) => {
  return fetcher(`${end}/${id}`);
};

const fetcher = (ext, options) => {
  console.log('fetcher getting called');
  return fetch(BASE_URL + ext, options)
    .then((res) => {
      if (res.status === 204) {
        return res;
      } else if (res.status === 400) {
        return 'Could not create user';
      } else if (res.status === 401) {
        return 'Username or password is incorrect';
      } else {
        console.log('res json', res.json());
        return res.json();
      }
    })
    .catch((error) => console.error(error));
};

export default {
  getAll,
  postOne,
  deleteOne,
  getAllUsers,
  createUser,
  login,
  profile,
};

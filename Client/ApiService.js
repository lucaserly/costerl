const BASE_URL = 'http://10.197.4.171:3002/';

const getAll = (end) => {
  return fetcher(end);
};

const postOne = (entry, end, id) => {

  entry.userId = id;

  return fetcher(end, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
};

const deleteOne = (id) => {
  return fetcher(`entries/${id}`, {
    method: 'DELETE'
  });
};

const getAllUsers = (end) => {
  return fetcher(end);
};

const createUser = (user, end) => {
  return fetcher(end, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

const login = (user, end) => {
  return fetcher(end, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

const profile = (end, id) => {
  return fetcher(`${end}/${id}`);
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => {
      if (res.status === 204) {
        return res;
      } else if (res.status === 400) {
        return 'Could not create user';
      } else if (res.status === 401) {
        return 'Username or password is incorrect';
      } else {
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
  profile
};
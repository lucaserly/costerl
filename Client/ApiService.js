const BASE_URL = 'http://10.197.2.147:3002/';

const getAll = () => {
  return fetcher('entries');
};

const postOne = (obj) => {
  return fetcher('entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
};

const deleteOne = (id) => {
  return fetcher(`entries/${id}`, {
    method: 'DELETE'
  });
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => {
      if (res.status === 204) {
        return res;
      } else {
        return res.json();
      }
    })
    .catch((error) => console.error(error));
};

export default {
  getAll,
  postOne,
  deleteOne
};
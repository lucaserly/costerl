const BASE_URL = 'http://10.197.5.9:3002/';

const getAll = () => {
  return fetcher('entries');
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => res.json())
    .catch((error) => console.error(error));
};

export default {
  getAll
};
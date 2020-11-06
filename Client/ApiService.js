const BASE_URL = 'http://10.197.4.90:3002/';

const getAll = () => {
  return fetcher('entries');
};

const fetcher = (ext, options) => {
  return fetch(BASE_URL + ext, options)
    .then((res) => res.json());
};

export default {
  getAll
};
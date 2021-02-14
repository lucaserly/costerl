const BASE_URL = 'http://192.168.1.167:3002/';

const fetcher = (ext, options) => fetch(BASE_URL + ext, options)
  .then((res) => (res.status < 400 ? res : res))
  .then((res) => (res.status !== 204 ? res.json() : res))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error:', err);
  });

const userLogin = (user, endPoint) => fetcher(endPoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

const getUserExpenses = (end, id) => fetcher(`${end}/${id}`);

const addExpense = (expense, endPoint, id) => {
  const expenseWithUserId = { ...expense, userId: id };
  return fetcher(endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseWithUserId),
  });
};

const deleteExpense = (id) => fetcher(`user/${id}`, {
  method: 'DELETE',
});

const registerUser = (user, end) => fetcher(end, {
  method: 'POST',
  header: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

export default {
  addExpense,
  deleteExpense,
  registerUser,
  userLogin,
  getUserExpenses,
};

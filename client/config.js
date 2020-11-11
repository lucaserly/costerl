export default {
  inputForm: [
    { label: 'item' },
    { label: 'category' },
    { label: 'description' },
    { label: 'payment' },
    { label: 'amount' },
    { label: 'date' },
  ],
  loginForm: [
    { label: 'username' },
    { label: 'password' }
  ],
  searchForm: [
    { label: 'search by item', flag: 'true' },
    { label: 'search by category', flag: 'true' },
    { label: 'search by description', flag: 'true' },
    { label: 'search by payment', flag: 'true' },
    { label: 'search by amount', flag: 'true' },
    { label: 'search by date', flag: 'true' }
  ],
  helperFunctions: {
    newFields: (text, target, fields) => {
      return fields.map((field) => {
        if (field.name === target) {
          field.value = text;
        }
        return field;
      });
    },
    resetField: (fields) => {
      return fields.map((field) => {
        if (field !== '') {
          field.value = '';
        }
        return field;
      });
    },
    emptyFieldCheck: (fields) => {
      return fields.filter((el) => el.name === 'item' || el.name === 'amount')
        .some((el) => el.value === '');
    },
    postHelper: (cleaner, arr, api, cb, list) => {
      const cleanedObj = cleaner(arr);
      api(cleanedObj)
        .then((data) => {
          cb([...list, data]);
        });
    },
    delHelper: (api, id, cb) => {
      api(id)
        .then(() => {
          cb((list) => {
            return list.filter((el) => {
              return el.id !== id;
            });
          });
        });
    },
    dataParser: (arr) => {
      const obj = {};
      arr.forEach((el) => {
        if (el.value !== '') {
          obj[el.name] = el.value;
        }
      });
      return obj;
    },
    flagCheck: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].flag === undefined) {
          return true;
        } else {
          break;
        }
      }
      return false;
    },
    filterHelper: (e, arr, cb, target, field) => {
      const ind = e.findIndex(el => el.name === target);
      const res = arr.filter((el) => {
        if (el[field]) {
          return el[field].includes(e[ind].value);
        }
      });
      cb(res);
    },
    regField: (target) => {
      const arr = target.split('');
      const ind = arr.indexOf('y');
      return arr.slice(ind + 2).join('');
    }
  }
}
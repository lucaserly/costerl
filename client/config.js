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
    filterHelper: (e, arr, cb) => {
      const item = e[0].value;
      const category = e[1].value;
      const description = e[2].value;
      const payment = e[3].value;
      const amount = e[4].value;
      const date = e[5].value;
      const res = arr.filter((el) => {
        if (el.item.includes(item) && el.category.includes(category) && el.description.includes(description) && el.payment.includes(payment) && el.amount.includes(amount) && el.date.includes(date)) {
          return el;
        }
      });
      cb(res);
    },
    regField: (target) => {
      const arr = target.split('');
      const ind = arr.indexOf('y');
      return arr.slice(ind + 2).join('');
    },
    nullConverter: (arr) => {
      const arrCopy = [...arr];
      for (let i = 0; i < arrCopy.length; i++) {
        for (let key in arrCopy[i]) {
          if (!arrCopy[i][key]) {
            arrCopy[i][key] = '';
          }
        }
      }
      return arrCopy;
    },
    dateInputFinder: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
          if (arr[i][key] === 'date') {
            return true;
          }
        }
      }
      return false;
    },
    handleChangeForm: (flagCheck, form, newFields, text, target, fields, setFields, filterList) => {
      if (flagCheck(form)) {
        const field = newFields(text, target, fields);
        setFields(field);
      } else {
        const field = newFields(text, target, fields);
        setFields(field);
        filterList(fields, target);
      }
    },
    handleSubmitForm: (emptyFieldCheck, fields, postOne, resetField, setFields, al, date) => {
      const check = emptyFieldCheck(fields);
      if (!check) {
        fields[5].value = date;
        postOne(fields);
        const field = resetField(fields);
        setFields(field);
      } else {
        al('Please enter both input and amount');
      }
    },
    getLabels: (obj) => {
      const res = [];
      for (let key in obj) {
        res.push(key);
      }
      return res;
    },
  }
}
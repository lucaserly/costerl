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
    { label: 'email' },
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
      const output = fields.map((field) => {
        if (field.name === target) {
          field.value = text;
        }
        return field;
      });
      return output;
    },
    resetField: (fields) => {
      return fields.map((field) => {
        if (field !== '') {
          field.value = '';
        }
        return field;
      });
    },
    emptyFieldCheck: (fields, conditions) => {
      const result = fields.filter((el) => el.name === conditions.names.first || el.name === conditions.names.second)
        .some((el) => el.value === '');
      return result;
    },
    postHelper: (cleaner, arr, api, cb, list, ext, id) => {
      const cleanedObj = cleaner(arr);
      api(cleanedObj, ext, id)
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
        if (el.item.includes(item) && el.category.includes(category)
          && el.description.includes(description) && el.payment.includes(payment)
          && el.amount.includes(amount) && el.date.includes(date)) {
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
    handleChangeForm: (flagCheck, form, newFields, text,
      target, fields, setFields, filterList) => {
      if (flagCheck(form)) {
        const field = newFields(text, target, fields);
        setFields(field);
      } else {
        const field = newFields(text, target, fields);
        setFields(field);
        filterList(fields, target);
      }
    },
    handleSubmitForm: (emptyFieldCheck, fields, postOne,
      resetField, setFields, alert,
      date, ext, id, currentUser) => {
      const findIndexOfDate = fields.findIndex((el, i) => {
        return el.name === 'date';
      });

      console.log('ext-->', ext);

      // ext -> can be login, register, entries
      // if (ext )
      // you set the altert messages bease on function argument passed from above and dynamically set below the message
      let errMsg;
      let succMsg;
      let conditions;
      // ext -> can be login, register, entries
      // if (ext)
      // you set the altert messages bease on function argument passed from above and dynamically set below the message

      // other strtegy ->
      // if ext is entries handle error
      // messaging here else handle it in login screen

      if (ext === 'register') {
        conditions = {
          names: {
            first: 'email',
            second: 'password'
          }
        };
        errMsg = 'Failed to register. Please try again';
      } else if (ext === 'login') {
        conditions = {
          names: {
            first: 'email',
            second: 'password'
          }
        };
        errMsg = 'Failed to login. Please try again';
        succMsg = 'Logged in. Vai cosi';
      } else {
        conditions = {
          names: {
            first: 'item',
            second: 'amount'
          }
        };
        errMsg = 'You successfully submitted your expense';
        succMsg = 'Please enter both input and amount';
      }

      const check = emptyFieldCheck(fields, conditions);
      if (!check) {
        if (ext === 'register' || ext === 'login') {
          postOne(fields, ext, id);
          const field = resetField(fields);
          setFields(field);
        } else {
          if (fields[findIndexOfDate]) fields[findIndexOfDate].value = date;
          postOne(fields, ext, id);
          const field = resetField(fields);
          setFields(field);
          alert(succMsg);
        }
      } else {
        console.log('INSIDE ALERT ELSE-->');
        alert(errMsg);
      }
    },
    getLabels: (obj) => {
      const res = [];
      res.push('none');
      for (let key in obj) {
        res.push(key);
      }
      return res;
    }
  }
};


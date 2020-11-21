const newFields = (text, target, fields) => {
  const output = fields.map((field) => {
    if (field.name === target) {
      field.value = text;
    }
    return field;
  });
  return output;
};

const resetField = (fields) => {
  return fields.map((field) => {
    if (field !== '') {
      field.value = '';
    }
    return field;
  });
};

const emptyFieldCheck = (fields, conditions) => {
  let result;
  if (Object.keys(conditions.names).length === 2) {
    result = fields
      .filter((el) => el.name === conditions.names.first || el.name === conditions.names.second)
      .some((el) => el.value === '');
  } else {
    result = fields
      .filter(
        (el) =>
          el.name === conditions.names.first ||
          el.name === conditions.names.second ||
          el.name === conditions.names.third,
      )
      .some((el) => el.value === '');
  }
  return result;
};

export const postHelper = (cleaner, arr, api, cb, list, ext, id) => {
  const cleanedObj = cleaner(arr);
  api(cleanedObj, ext, id).then((data) => {
    cb([...list, data]);
  });
};

export const delHelper = (api, id, cb) => {
  api(id).then(() => {
    cb((list) => {
      return list.filter((el) => {
        return el.id !== id;
      });
    });
  });
};

export const dataParser = (arr) => {
  const obj = {};
  arr.forEach((el) => {
    if (el.value !== '') {
      obj[el.name] = el.value;
    }
  });
  return obj;
};

const flagCheck = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].flag === undefined) {
      return true;
    } else {
      break;
    }
  }
  return false;
};

const filterHelper = (e, arr, cb) => {
  const item = e[0].value;
  const category = e[1].value;
  const description = e[2].value;
  // const payment = e[3].value;
  // const amount = e[4].value;
  // && el.payment.includes(payment)
  //&& el.date.includes(date)
  // && el.amount.includes(amount)
  const date = e[3].value;
  const res = arr.filter((el) => {
    if (el.item.includes(item) && el.category.includes(category) && el.description.includes(description)) {
      return el;
    }
  });
  cb(res);
};

const regField = (target) => {
  const arr = target.split('');
  const ind = arr.indexOf('y');
  return arr.slice(ind + 2).join('');
};

const nullConverter = (arr) => {
  const arrCopy = [...arr];
  for (let i = 0; i < arrCopy.length; i++) {
    for (let key in arrCopy[i]) {
      if (!arrCopy[i][key]) {
        arrCopy[i][key] = '';
      }
    }
  }
  return arrCopy;
};

const dateInputFinder = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      if (arr[i][key] === 'date') {
        return true;
      }
    }
  }
  return false;
};

const handleChangeForm = (flagCheck, form, text, target, fields, setFields, filterList) => {
  if (flagCheck(form)) {
    const field = newFields(text, target, fields);
    setFields(field);
  } else {
    const field = newFields(text, target, fields);
    setFields(field);
    filterList(fields, target);
  }
};

const handleSubmitForm = (ext) => {
  let errMsg;
  let succMsg;
  let conditions;

  if (ext === 'register') {
    conditions = {
      names: {
        first: 'email',
        second: 'password',
      },
    };
    errMsg = 'Failed to register. Please try again ☠️';
  } else if (ext === 'login') {
    conditions = {
      names: {
        first: 'email',
        second: 'password',
      },
    };
    errMsg = 'Failed to login. Please try again 🖕';
    succMsg = 'Logged in. Vai cosi';
  } else {
    conditions = {
      names: {
        first: 'item',
        second: 'amount',
        third: 'category',
      },
    };
    succMsg = 'You successfully submitted your expense';
    errMsg = 'Please enter input, category & amount. Thank you 😀';
  }
};

const emptyFieldCheck = (fields) => {
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
};

const getLabels = (obj) => {
  const res = [];
  res.push('none');
  for (let key in obj) {
    res.push(key);
  }
  return res;
};

const findIndexOfDate = (inputArr) => {
  fields.findIndex((el) => {
    return el.name === 'date';
  });
};

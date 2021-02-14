const removeEmptyProperties = (arr) => {
  const obj = {};
  arr.forEach((el) => {
    if (el.value !== '') {
      obj[el.name] = el.value;
    }
  });
  return obj;
};

const valuesExtractor = (arr, cb) => {
  const result = [];
  arr.forEach((el) => {
    const val = [];
    Object.keys(el).forEach((key) => {
      if (cb(key)) val.push(el[key]);
    });
    val.push('');
    result.push(val);
  });
  return result;
};

export default {
  removeEmptyProperties,
  valuesExtractor,
};

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
    }
  }
}
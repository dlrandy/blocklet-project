const validator = require('validator');

function validate(address = '', page = '0') {
  const errors = [];
  if (validator.isEmpty(address)) {
    errors.push('地址不能为空');
  }

  if (!validator.isInt(page, { min: 0 })) {
    errors.push('页数不能小于0');
  }
  return errors;
}
module.exports = validate;

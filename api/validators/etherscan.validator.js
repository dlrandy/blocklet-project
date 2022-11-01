const validator = require('validator');

function validate(address, page = 1) {
  const errors = [];
  if (validator.isEmpty(address)) {
    errors.push('地址不能为空');
  }

  if (!validator.isInt(page, { min: 1 })) {
    errors.push('页数不能小于1');
  }
  return errors;
}
module.exports = validate;

const _ = require("lodash");

module.exports = {
  handleResponseObject: ({ error, data, code, message }) => {
    let status = false;
    status = error ? true : false;
    let body = JSON.stringify({
      error: status,
      code: code,
      message: message,
      response: data ? data : null
    });
    return {
      statusCode: code,
      headers: { "content-type": "application/json" },
      body: body
    };
  },
  handleRequestArguments: (arguments, requiredFields) => {
    let errors = {};
    for (let i = 0; i < requiredFields.length; i++) {
      if (!arguments.hasOwnProperty(requiredFields[i])) {
        errors[requiredFields[i]] = "is required";
      }
    }
    if (_.isEmpty(errors)) {
      return null;
    } else {
      return errors;
    }
  }
};

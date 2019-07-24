let { _save, _list } = require("../config/Dynamo");

let TABLE_NAME = `${process.env.TABLE_BASE_NAME}-Practictioners`;

module.exports = {
  save: async (data, callback) => {
    let parameters = {
      TableName: TABLE_NAME,
      Item: data,
    };
    await _save(parameters, state => {
      return callback(state);
    });
  },

  list: async callback => {
    let parameter = {
      TableName: TABLE_NAME
    };
    await _list(parameter, state => {
      return callback(state);
    });
  }
};

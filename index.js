const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
  console.log("Got an Invoke Request: " + event.field);
  switch (event.field) {
    case "createPatient":
      callback(null, event);
      break;
    case "getPatients":
      callback(null, []);
      break;
    default:
      callback("Unknown field, unable to resolve" + event.field, null);
      break;
  }
};

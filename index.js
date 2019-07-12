require("dotenv").config();

const { createPatientEntry, listPatients } = require("./lib/services/Patient");

const {
  handleRequestArguments,
  handleResponseObject
} = require("./lib/utils/helpers");

let errors = null;

exports.handler = async (event, context, callback) => {
  switch (event.field) {
    case "createPatient":
      errors = handleRequestArguments(event.arguments, [
        "firstName",
        "lastName",
        "walletAddress",
        "userId"
      ]);
      if (errors) {
        handleResponseObject({
          error: true,
          message: "Invalid parameter(s) provided",
          data: errors
        });
      }
      await createPatientEntry(event.arguments, response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, response);
        }
      });
      break;
    case "getPatients":
      await listPatients(response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, response);
        }
      });
      break;
    default:
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
  }
};

require("dotenv").config();

const { createPatientEntry, listPatients } = require("./lib/services/Patient");
const {
  createPractitionerEntry,
  listPractitioners
} = require("./lib/services/Practitioner");

const {
  createInteractionEntry,
  listInteractions
} = require("./lib/services/Interaction");

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
          callback(null, event.arguments);
        }
      });
      break;
    case "getPatients":
      await listPatients(response => {
        console.log(response);
        callback(null, response);
      });
      break;
    case "createPractitioner":
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
      await createPractitionerEntry(event.arguments, response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, event.arguments);
        }
      });
      break;
    case "getPractitioners":
      await listPractitioners(response => {
        callback(null, response);
      });
      break;
    case "createInteraction":
      errors = handleRequestArguments(event.arguments, [
        "interaction",
        "patient",
        "practitioner",
        "ratings"
      ]);
      if (errors) {
        handleResponseObject({
          error: true,
          message: "Invalid parameter(s) provided",
          data: errors
        });
      }
      await createInteractionEntry(event.arguments, response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, event.arguments);
        }
      });
      break;
    case "getInteractions":
      await listInteractions(response => {
        callback(null, response);
      });
      break;
    default:
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
  }
};

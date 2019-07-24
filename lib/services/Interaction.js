const { pick } = require("lodash");
const uuid = require("uuid/v4");

const { save, list } = require("../models/Interaction");

module.exports = {
  createInteractionEntry: async (fields, callback) => {
    let allowedParameters = [
      "interaction",
      "patient",
      "practitioner",
      "ratings"
    ];

    let data = pick(fields, allowedParameters);
    data["id"] = uuid();
    data["createdAt"] = new Date().toISOString();

    await save(data, response => {
      if (response.error) {
        callback({ error: true, message: response.message.message });
      } else {
        callback({ error: false, data: response });
        // @todo send token to patient, practitioner, chw.
      }
    });
  },

  listInteractions: async callback => {
    await list(response => {
      let data = response.Items;
      callback({ error: false, data });
    });
  }
};

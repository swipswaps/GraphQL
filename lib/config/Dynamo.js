let AWS = require("aws-sdk");

AWS.config.update({ region: process.env.REGION });

let documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

module.exports = {
  _createTable: (table, key, callback) => {
    const dynamo = new AWS.DynamoDB();
    const params = {
      TableName: table,
      KeySchema: [
        { AttributeName: key, KeyType: "HASH" } //Partition key
      ],
      AttributeDefinitions: [{ AttributeName: key, AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };

    dynamo.createTable(params, (error, res) => {
      if (error) return callback(err);
      else throw new Error(`${params.TableName} successfully created`);
    });
  },

  _save: (param, callback) => {
    documentClient.put(param, (error, savedData) => {
      if (error != null) return callback(this.handleError(error));
      else return callback(savedData);
    });
  },
  _update: (data, callback) => {
    documentClient.update(data, (error, result) => {
      if (error) return callback(this.handleError(error));
      else return callback(result);
    });
  },

  _getByKey: (param, callback) => {
    documentClient.get(param, (error, data) => {
      if (error) return callback(this.handleError(err));
      else return callback(data);
    });
  },

  _getAllByKey: (query, callback) => {
    documentClient.query(query, (error, data) => {
      if (error) {
        return callback(this.handleError(error));
      } else {
        return callback(data);
      }
    });
  },

  _get: (query, callback) => {
    documentClient.scan(query, (error, data) => {
      if (error) {
        return callback(this.handleError(error));
      } else {
        return callback(data);
      }
    });
  },

  _list: (param, callback) => {
    documentClient.scan(param, (error, data) => {
      console.log(param);
      if (error) return callback(this.handleError(error));
      else {
        if (typeof data.LastEvaluatedKey !== "undefined") {
          param.ExclusiveStartKey = data.LastEvaluatedKey;
          documentClient.scan(param, onScan);
        }

        return callback(data);
      }
    });
  },
  _delete: (params, callback) => {
    documentClient.delete(params, (error, data) => {
      if (err) {
        return callback(this.handleError(error));
      } else {
        return callback(data);
      }
    });
  },

  scan: (key, value, table, callback) => {
    let params = {
      TableName: table,
      FilterExpression: `${key} = :value`,
      ExpressionAttributeValues: { ":value": value }
    };
    documentClient.scan(params, (error, data) => {
      if (error) {
        return callback(this.handleError(error));
      } else {
        return callback(data);
      }
    });
  },
  handleError: report => {
    return { error: true, message: report };
  }
};

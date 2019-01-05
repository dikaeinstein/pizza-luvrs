const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-2',
});

const docClient = new AWS.DynamoDB.DocumentClient();

function putItem(table, item, callback) {
  const params = {
    TableName: table,
    Item: item,
  };

  docClient.put(params, callback); 
}

function getAllItems(table, callback) {
  const params = { TableName: table };

  docClient.scan(params, callback);
}

function getItem(table, idName, id, callback) {
  const params = {
    TableName: table,
    Key: { [idName]: id },
  };

  docClient.get(params, callback);
}

module.exports = { getAllItems, putItem, getItem };

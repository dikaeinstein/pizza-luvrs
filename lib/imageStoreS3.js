'use strict';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({ signatureVersion: 'v4' });

module.exports.save = function (name, data, callback) {
  const params = {
    Bucket: 'pizza-luvrs-dika',
    Key: `pizzas/${name}.png`,
    Body: Buffer.from(data, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  };

  s3.putObject(params, (err, data) => {
    callback(err, `https://s3.eu-west-2.amazonaws.com/pizza-luvrs-dika/${params.Key}`);
  });
};
 
/** 
 * Example of RESTful API using Express and NodeJS
 * @author Shin
 * @version 0.0.3
 */

/** BEGIN: Express Server Configuration */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var CryptoJS = require("crypto-js");
var base64 = require("js-base64").Base64;

var mongoose = require('mongoose');
//mongoose.connect('mongodb://app_user:password@ds035826.mlab.com:35826/cmu_sv_app');
mongoose.connect('mongodb://shin:1234@ds021346.mlab.com:21346/shin_db');
/** END: Express Server Configuration */

/** BEGIN: Express Routes Definition */
var router = require('./routes/router');
var cars = require('./routes/cars');
var drivers = require('./routes/drivers');
var passengers = require('./routes/passengers');
var paymentAccounts = require('./routes/paymentaccounts');
var rides = require('./routes/rides');
var sessions = require('./routes/sessions');


// decryption
app.use(function (req, res, next) {
  headers = req.headers;

  if (req.url != '/sessions') {
    if (headers.token === 'undefined') {
      res.status(404).json({
        'errorCode': '1007',
        'errorMessage': 'Missing token',
        'statusCode': '404'
      });
      return;
    } else {
      cryptedHash = base64.decode(headers.token);
      uncryptedHash = CryptoJS.AES.decrypt(cryptedHash, "Secret").toString(CryptoJS.enc.Utf8);

      try {
        username = uncryptedHash.split(':')[0];
        expiration = uncryptedHash.split(':')[1];
        clearString = username + ":" + expiration;
        HashedClearString = uncryptedHash.split(':')[2];

        reHashedClearString = CryptoJS.HmacSHA1(clearString, "APP");
        if (HashedClearString != reHashedClearString) {
          res.status(404).json({
            'errorCode': '1012',
            'errorMessage': 'Invalid decrypted Token',
            'statusCode': '404'
          });
          return;
        }
      } catch (error) {
        res.status(404).json({
          'errorCode': '1013',
          'errorMessage': 'Invalid Token',
          'statusCode': '404'
        });
        return;
      }
      if (expiration < parseInt(Date.now() / 1000)) {
        res.status(404).json({
          'errorCode': '1014',
          'errorMessage': 'Expired Token',
          'statusCode': '404'
        });
        return;
      } else {
        console.log("decrypt success!");
      }
    }
  }
  next();
});

app.use('/api', cars);
app.use('/api', drivers);
app.use('/api', passengers);
app.use('/api', paymentAccounts);
app.use('/api', rides);
app.use('/api', router);
app.use('/api', sessions);
/** END: Express Routes Definition */

/** BEGIN: Express Server Start */
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;
/** END: Express Server Start */
/*
token
npm install crypto-js --save
npm install js-base64 --save

 * Express Route: /drivers
 * @author Shin
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var CryptoJS=require("crypto-js");
var base64=require("js-base64").Base64;

router.route('/sessions')
    .post(function(req, res){
        /* Store name and pwd in database, BEGAN */
        const usernameDB = "john";
        const clearPasswordDB = "12315"; 
        const hashPasswordDB = CryptoJS.HmacSHA1(clearPasswordDB,"psw").toString();//psw is a key
        /* Store name and pwd in database, END */

        // If no name in request body
        if(req.body.username == undefined) {
            res.status(400).json({
                "errorCode": 1008, // Missing Name when asking for token
                "errorMsg": "Missing username when ask for token",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }

        // If no password given
        if(req.body.password === undefined) {
            res.status(400).json({
                "errorCode": 1009, // Missing password when asking for token
                "errorMsg": "Missing password when ask for token",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }

        // If provided username does not match with username in Database
        if(req.body.username !== usernameDB) {
            res.status(404).json({
                "errorCode": 1010, // username does not match
                "errorMsg": "Username does not match",
                "statusCode": 404,
                "statusTxt": "Not Found"
            }).end();
            return;
        }

        // If provided password does not match with password in Database
        var hashPassword = CryptoJS.HmacSHA1(req.body.password, "pw").toString();
        if(hashPassword !== hashPasswordDB) {
            res.status(404).json({
                "errorCode": 1011, // password does not match
                "errorMsg": "Password does not match",
                "statusCode": 404,
                "statusTxt": "Not Found"
            }).end();
            return;
        }
        
        var username = req.body.username;
        var password = req.body.password;
        // define expiration time
        expiration = (parseInt(Date.now()/1000) + 3600);
        
        // encryption process
        clearString = username+":"+expiration;
        hashString = CryptoJS.HmacSHA1(clearString,"APP");
        cryptString = CryptoJS.AES.encrypt(clearString+":"+hashString,"Secret").toString(); //
        response = {token: base64.encode(cryptString)};
        res.status(200).json(response);
    });

module.exports = router;
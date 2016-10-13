/** 
 * Express Route: /paymentaccounts
 * @author Clark Jeria, Shin
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');


var mongoose     = require('mongoose');

var reportError = require('../app/utils');
var PaymentAccount = require('../app/models/paymentaccount');

router.route('/paymentaccounts') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        PaymentAccount.find(function(err, cars){
            if(err){
                res.status(500).send({
                    "errorCode": 2004,
                    "errorMsg": "no paymentaccount data",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
                /**
                 * Wrap this error into a more comprehensive message for the end-user
                 */
            }else{
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        if (typeof req.body.make === "undefined" || req.body.make.length > 18) {
            res.sendStatus(400);
            return;

        }
        /**
         * Add aditional error handling here
         */

        var paymentaccount = new PaymentAccount();
        paymentaccount.accountType = req.body.accountType;
        paymentaccount.accountNumber = req.body.accountNumber;
        paymentaccount.expirationDate = req.body.expirationDate;
        paymentaccount.nameOnAccount = req.body.nameOnAccount;
        paymentaccount.bank = req.body.bank;
        paymentaccount.driver_id = req.body.driver_id;
        paymentaccount.passenger_id = req.body.passenger_id;

        paymentaccount.save(function(err){
            if(err){
                var dictError = {
                    required: 1001,
                    maxlength: 1002,
                    minlength: 1003,
                    type: 1004,
                    validate: 1005,
                }
                if (err.errors) {
                    for (var key in err.errors) {
                        var errorType = err.errors[key].kind;
                        if (errorType === "required") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "maxlength") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "minlength") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "type") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "validate") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                    }
                }
                res.status(500).send({
                    "errorCode": 1006,
                    "errorMsg": "Invalid value in driver",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.status(201).json(paymentaccount);
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/paymentaccounts/:paymentaccount_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        if (!mongoose.Types.ObjectId.isValid(req.params.paymentaccount_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        PaymentAccount.findById(req.params.paymentaccount_id, function(err, paymentaccount){
            if(err){
                res.status(500).send({
                    "errorCode": 3004,
                    "errorMsg": 'Given paymentaccount does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                if (!paymentaccount)
                    res.sendStatus(404);
                else
                    res.json(paymentaccount);
            }
        });  
    })
    /**
     * PATCH call for the car entity (single).
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        /**
         * Add extra error handling rules here
         */

        PaymentAccount.findById(req.params.paymentaccount_id, function(err, paymentaccount){
            if(err){
                res.status(500).send({
                    "errorCode": 3004,
                    "errorMsg": 'Given paymentaccount does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                // for(var key in req.body) {
                //     if(req.body.hasOwnProperty(key)){
                //         if(key == 'license'){
                //             /**
                //              * Add extra error handling rules here
                //              */
                //             car.license = req.body.license;
                //         }
                //         if(key == 'doorCount'){
                //             /**
                //              * Add extra error handling rules here
                //              */
                //             car.doorCount = req.body.doorCount;
                //         }
                //         /**
                //          * Repeat for the other properties
                //          */
                //     }
                // }
                //car.license = req.body.license;
                paymentaccount.save(function (err) {
                    if (err) {
                        var dictError = {
                            required: 1001,
                            maxlength: 1002,
                            minlength: 1003,
                            type: 1004,
                            validate: 1005,
                        }
                        if (err.errors) {
                            for (var key in err.errors) {
                                var errorType = err.errors[key].kind;
                                if (errorType === "required") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "maxlength") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "minlength") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "type") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "validate") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                            }
                        }
                        res.status(500).send({
                            "errorCode": 1006,
                            "errorMsg": 'Invalid value in car',
                            "statusCode": 500,
                            "statusTxt": 'Mongoose Database Error'
                        });
                    } else {
                        res.json(paymentaccount);
                    }
                });

                paymentaccount.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json(car);
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        /**
         * Add extra error handling rules here
         */
        PaymentAccount.remove({
            _id : req.params.paymentaccount_id
        }, function(err, paymentaccount){
            if(err){
                res.status(500).send({
                    "errorCode": 3004,
                    "errorMsg": 'Given paymentaccount does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.json({"message" : "Car Deleted"});
            }
        });
    });

module.exports = router;
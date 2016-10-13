/** 
 * Express Route: /drivers
 * @author Clark Jeria, J. Shin
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
//var util = require('util');
var mongoose     = require('mongoose');
var reportError = require('../app/utils');

var Driver = require('../app/models/driver');

router.route('/drivers') 
    /**
     * GET call for the driver entity (multiple).
     * @returns {object} A list of drivers. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Driver.find(function(err, drivers){
            if(err){
                res.status(500).send({
                    "errorCode": 2002,
                    "errorMsg": "no driver data",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
                /**
                 * Wrap this error into a more comprehensive message for the end-user
                 */
            }else{
                res.json(drivers);
            }
        });
    })
    /**
     * POST call for the driver entity.
     */
    .post(function(req, res){
        if (typeof req.body.emailAddress === "undefined" || req.body.firstName.length > 15) {
            res.sendStatus(400);
            return;
        }
        /**
         * Add aditional error handling here
         */

        var driver = new Driver(req.body);
        // driver.firstName = req.body.firstName;
        // driver.lastName = req.body.lastName;
        // driver.dateOfBirth = req.body.dateOfBirth;
        // driver.licenseType = req.body.licenseType;
        // driver.username = req.body.username;
        // driver.emailAddress = req.body.emailAddress;
        // driver.password = req.body.password;
        // driver.addressLine1 = req.body.addressLine1;
        // driver.addressLine2 = req.body.addressLine2;
        // driver.city = req.body.city;
        // driver.state = req.body.state;
        // driver.zip = req.body.zip;
        // driver.phoneNumber = req.body.phoneNumber;

        driver.save(function(err){
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

                //res.status(500).send(err);
                // res.status(500).json({
                //     errorCode: 1001,
                //     errorMsg: err.errors,
                //     statusCode: 400,
                //     statusTxt: 'Bad Request'
                // });
                res.status(500).send({
                    "errorCode": 1006,
                    "errorMsg": "Invalid value in driver",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.status(201).json(driver);
            }
        });
    });

/** 
 * Express Route: /drivers/:driver_id
 * @param {string} driver_id - Id Hash of driver Object
 */
router.route('/drivers/:driver_id')
    /**
     * GET call for the driver entity (single).
     * @returns {object} the driver with Id driver_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        if (!mongoose.Types.ObjectId.isValid(req.params.driver_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                res.status(500).send({
                    "errorCode": 3002,
                    "errorMsg": "Given driver dose not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                if (!driver)
                    res.status(404).send(err);
                else
                    res.status(200).json(driver);
            }
        });  
    })
    /**
     * PATCH call for the driver entity (single).
     */
    .patch(function(req, res){        
        /**
         * Add aditional error handling here
         */

        Driver.findById(req.params.driver_id, function(err, car){
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
                    "errorCode": 3002,
                    "errorMsg": "Given driver dose not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                car.license = req.body.license;
                car.save(function (err) {
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
                        res.json({ "message": "Car Updated", "car_created": car });
                    }
                });

                driver.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json(driver);
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the driver entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Driver.remove({
            _id : req.params.driver_id
        }, function(err, driver){
            if(err){
                res.status(500).send({
                    "errorCode": 3002,
                    "errorMsg": "Given driver does not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.json({"message" : "Driver Deleted"});
            }
        });
    });

module.exports = router;
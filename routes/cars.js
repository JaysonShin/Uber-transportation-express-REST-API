/** 
 * Express Route: /cars
 * @author Clark Jeria, J. Shin
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var mongoose     = require('mongoose');

var reportError = require('../app/utils');
var Car = require('../app/models/car');

router.route('/cars') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Car.find(function(err, cars){
            if(err){
                res.status(500).send({
                    "errorCode": 2001,
                    "errorMsg": "no car data",
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

        var car = new Car();
        car.license = req.body.license;
        car.doorCount = req.body.doorCount;
        car.make = req.body.make;
        car.model = req.body.model;

        car.save(function(err){
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
                res.status(201).json(car);
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        if (!mongoose.Types.ObjectId.isValid(req.params.car_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                if (!car)
                    res.sendStatus(404);
                else
                    res.json(car);
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

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
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

                car.save(function(err){
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
        Car.remove({
            _id : req.params.car_id
        }, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.json({"message" : "Car Deleted"});
            }
        });
    });

module.exports = router;
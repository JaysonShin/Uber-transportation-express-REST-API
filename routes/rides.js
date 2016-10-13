/** 
 * Express Route: /rides
 * @author Clark Jeria, J. Shin
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var mongoose     = require('mongoose');

var reportError = require('../app/utils');
var Ride = require('../app/models/ride');



router.route('/rides') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Ride.find(function(err, cars){
            if(err){
                res.status(500).send({
                    "errorCode": 4001,
                    "errorMsg": "no ride data",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
                /**
                 * Wrap this error into a more comprehensive message for the end-user
                 */
            }else{
                res.json(rides);
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

        var ride = new Ride();
        ride.passenger = req.body.passenger;
        ride.driver = req.body.driver;
        ride.car = req.body.car;
        ride.rideType = req.body.rideType;
        ride.startPoint = req.body.startPoint;
        ride.endPoint = req.body.endPoint;
        ride.requestTime = req.body.requestTime;
        ride.pickupTime = req.body.pickupTime;
        ride.dropOffTime = req.body.dropOffTime;
        ride.status = req.body.status;
        ride.fare = req.body.fare;
        ride.route = req.body.route;

        ride.save(function(err){
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
                    "errorMsg": "Invalid value in ride",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.status(201).json(ride);
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/rides/:ride_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        if (!mongoose.Types.ObjectId.isValid(req.params.ride_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Ride.findById(req.params.ride_id, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given ride does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                if (!ride)
                    res.sendStatus(404);
                else
                    res.json(ride);
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

        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send({
                    "errorCode": 4001,
                    "errorMsg": 'Given ride does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                ride.save(function (err) {
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
                            "errorMsg": 'Invalid value in ride',
                            "statusCode": 500,
                            "statusTxt": 'Mongoose Database Error'
                        });
                    } else {
                        res.json(ride);
                    }
                });

                ride.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json(ride);
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
        Ride.remove({
            _id : req.params.ride_id
        }, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode": 4001,
                    "errorMsg": 'Given ride does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            }else{
                res.json({"message" : "Ride Deleted"});
            }
        });
    });

// route points
 router.route('/rides/:ride_id/routePoints') 
    .post(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send({
                   "statusCode" : 500,
                    "errorCode" : 1012,
                    "errorMsg" : 'Given ride does not exist',
                });
            }else{
                var rp = {};                
                rp.latitude = req.body.latitude;
                rp.longitude = req.body.longitude;
                ride.route.push(rp);
            }
            ride.save(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.json({"message" : "Ride Updated", "new route point added" : ride});
                }
            });
    	});
    })
    .get(function(req, res){        
        Ride.findById(req.params.ride_id, function(err, Ride){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given Ride does not exist',                    
                });
            }else{
                res.json(ride.route);
            }
        });  
    });
 router.route('/rides/:ride_id/routePoints/current')
 	.get(function(req, res){        
        Ride.findById(req.params.ride_id, function(err, Ride){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given Ride does not exist',                    
                });
            }else{
            	var current = ride.route.slice(-1)[0]
                res.json(current);
            }
        });  
    });

module.exports = router;
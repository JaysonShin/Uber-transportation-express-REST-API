/**
 * Mongoose Schema for the Entity Passenger
 * @author Clark Jeria, Shin
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PassengerSchema   = new Schema({
    firstName: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    lastName: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    emailAddress: {
        type: String,
        trim: true,
        validate: [/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/],
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:6,
        maxlength:16
    },
    addressLine1: {
        type: String,
        trim: true,
        maxlength: 50 
    },
    addressLine2: {
        type: String,
        trim: true,
        maxlength: 50 
    },
    city: {
        type: String,
        trim: true,
        maxlength: 50
    },
    state: {
        type: String,
        trim: true,
        maxlength: 2 
    },
    zip: {
        type: String,
        trim: true,
        maxlength: 5
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: function(val){ 
            var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return re.test(val);
        },
    },
    // paymentAccount: { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'paymentAccount' 
    // }
});

module.exports = mongoose.model('Passenger', PassengerSchema);

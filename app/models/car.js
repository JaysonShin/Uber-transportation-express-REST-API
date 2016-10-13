/**
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria, Shin
 * @version 0.0.3
 */

 var mongoose     = require('mongoose');
 var Schema       = mongoose.Schema;

 var CarSchema   = new Schema({
     license: {
       type: String,
       required: true,
       trim: true,
       maxlength: 10
     },
     model: {
       type: String,
       required: true,
       trim: true,
       maxlength: 18
     },
     doorCount: {
       type: Number,
       default: 4,
       trim: true
       // validate: [1-8]
     },
     make: {
       type: String,
       trim: true,
       maxlength: 18
     },
     driver: {
       type: Schema.ObjectId, ref: 'Driver'
     }
 });

 module.exports = mongoose.model('Car', CarSchema);

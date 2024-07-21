const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    selectedPickupState: {
        type:String,
        required:true},

    selectedPickupCity: {
        type:String,
        required:true},
    selectedDropState: {
        type:String,
        required:true},
    selectedDropCity: {
        type:String,
        required:true},
    pickupdate: {
        type:String,
        required:true},
    pickuptime: String,
    dropdate: {
        type:String,
        required:true},
    droptime: String,
    drivername: String,
    fare: String,
    carname: String,
    cartype: String,
    carno: String,
    price: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    bookeddate: {
        type: String,
        default: () => new Date().toLocaleDateString('hi-IN') 
    }
});

module.exports = mongoose.model('booking', rideSchema);

const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  drivername: String,
  carname: String,
  cartype: String,
  carno: String,
  carImage: String,
  price: Number
});

const Cab = mongoose.model('Cab', cabSchema);
module.exports = Cab;

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  bottleCount: Number,
  cost: Number,
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);

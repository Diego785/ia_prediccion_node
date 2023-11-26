const mongoose = require('mongoose');

// Define the schema for each prediction
const predictionSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  predicciones: {
    type: Number,
    required: true,
  },
});

// Define the schema for the log entry
const futureSale = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  predictions: {
    type: [predictionSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model using the schema
const FutureSaleModel = mongoose.model('FutureSale', futureSale);

module.exports = { FutureSaleModel };
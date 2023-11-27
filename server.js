const express = require('express');
const app = express();
const { processApiData } = require('./logic/app');
const { getExpiredProducts } = require('./logic/next-expired-products');
const { FutureSaleModel } = require('./data/mongo/models/future-sales');
const { MongoDatabase } = require('./data/mongo/init');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/api/show-ia', (req, res) => {
  res.json({ mensaje: 'Hello World from Node.js with Docker by Diego HV :3' });
});



app.get('/api/show-predictions', async (req, res) => {
  try {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL || '',
      dbName: process.env.MONGO_DB_NAME || '',
    });
    const url = 'http://144.22.133.47:8000/api/get-list';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const apiData = await response.json();
    // Process the API data and get predictions
    const predictions = processApiData(apiData);

    //SAVE IN MONGO

    // Create a new log entry in MongoDB
    const newFutureSales = await FutureSaleModel.create({
      message: 'Predicciones para los siguientes tres días desde la útltima venta.',
      predictions: predictions,
    });

    await newFutureSales.save();

    console.log(newFutureSales);




    // Send the predictions as a JSON response
    res.json({
      mensaje: 'Predicciones para los siguientes tres días desde la útltima venta.',
      predictions
    });


  } catch (error) {
    console.error('Error fetching or processing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/show/next-expired-products', async (req, res) => {
  try {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL || '',
      dbName: process.env.MONGO_DB_NAME || '',
    });
    const url = 'http://144.22.133.47:8000/api/producto';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const apiData = await response.json();
    const nextExpiratedProducts = getExpiredProducts(apiData);

    // // Create a new log entry in MongoDB
    // const newFutureSales = await FutureSaleModel.create({
    //   message: 'Predicciones para los siguientes tres días desde la útltima venta.',
    //   predictions: predictions,
    // });

    // await newFutureSales.save();

    // console.log(newFutureSales);

    // Send the predictions as a JSON response
    res.json({
      nextExpiratedProducts,
    });


  } catch (error) {
    console.error('Error fetching or processing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});

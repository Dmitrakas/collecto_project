const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const collectionRouter = require('./routes/collection.routes');
const itemRouter = require('./routes/item.routes');
const corsMiddleware = require('./middleware/cors.middleware')


const PORT = process.env.PORT || config.get('serverPort');
const app = express();
app.use(corsMiddleware);
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/item', itemRouter);


const start = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
      });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  }
  catch (err) {
  }
}

start();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const databaseConfig = require('./config/database.config');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

mongoose.connect(databaseConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/collections', require('./routes/collections'));
app.use('/api/items', require('./routes/items'));
app.use('/api/itemFields', require('./routes/itemFields'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/itemTags', require('./routes/itemTags'));
app.use('/api/comments', require('./routes/comments'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

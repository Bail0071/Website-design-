const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const returnsRouter = require('./routes/returns');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb+srv://doadmin:3A9d5Ms7oVT846K1@db-mongodb-nyc3-14006-9503eeb2.mongo.ondigitalocean.com/admin?tls=true&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/api/products', productsRouter);
app.use('/api/returns', returnsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const { authMiddleware } = require('./middleware/auth.middleware');
const {productsRoute} = require('./routes/products.route');

const app = express()
app.use(express.json())

app.use(authMiddleware);

app.use('/api/products', productsRoute);


app.listen(8000)
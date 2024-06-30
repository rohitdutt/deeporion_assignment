const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const connectDB = require("./config/database");

const app = express();

connectDB();

app.use(express.json());

const corsOptions = {
    exposedHeaders: ['Role', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

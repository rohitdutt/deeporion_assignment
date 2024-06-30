const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURL = process.env.DATABASE_URL;
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected, Lets roll');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

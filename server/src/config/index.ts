const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
};

export default config;
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET)
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');

const config = {
  port: process.env.PORT || 3000,
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
};

export default config;

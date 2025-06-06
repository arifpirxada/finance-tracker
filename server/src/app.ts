import express from "express";
import cors from "cors"
import morgan from "morgan";
import path from "path"
import fs from "fs"
// import { handleError } from "libraries/errors/errorHandler";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logging

if (process.env.NODE_ENV === 'production') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs/access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream })); // logs into file
} else {
  app.use(morgan('dev')); // logs into terminal
}

// Routes

app.get("/", (req, res) => {
    res.send("Welcome")
})

// Global error middleware
// app.use(handleError);


export default app;
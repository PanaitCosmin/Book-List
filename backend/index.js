import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js'

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const CLIENT = process.env.CLIENT

const app = express();

// Middleware
app.use(cors({
  origin: CLIENT,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", CLIENT);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
//   });

app.use(express.json());

app.use('/api', bookRoute)

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
        console.log("App is running on port:", PORT);
      });
  })
  .catch((error) => {
    console.log(error);
  });

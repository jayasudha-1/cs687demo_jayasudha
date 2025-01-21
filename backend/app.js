require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//! Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)  // Use the MONGO_URI from the environment variables
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));
//!Connect to mongodb
mongoose
  .connect("mongodb+srv://kalamegamjayasudha:jayasudha@projectdb.fw1am.mongodb.net/?retryWrites=true&w=majority&appName=projectdb")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);
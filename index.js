import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Router from "./router/index.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongo connected");
    })
    .catch((err) => {
        console.log(err);
    });
app.use("/", Router)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
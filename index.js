import chalk from "chalk";
import express from "express";
const app=express();
const PORT=3000;
import "dotenv/config";
import todoRouter from "./routers/todo.js";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log(chalk.green("Connected to MongoDB successfully"));
})
.catch(()=>{
    console.log(chalk.red("Failed to connect to MongoDB"));
})
app.use(express.json());
app.use("/todo",todoRouter)
app.listen(PORT,()=>{
    console.log(chalk.blue(`Server is running on port ${PORT}`))
})
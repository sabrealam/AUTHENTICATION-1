const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbFunction = require("./config/db");
 
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
 
app.use(`/users`, require("./route/user.route"));
app.use(`/todos`, require("./route/todo.route"));


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(`${process.env.PORT}` || 5000, async() => {
    try {
        console.log("server is running");
        await dbFunction();
    } catch (error) {
        console.log(error);
    }
})
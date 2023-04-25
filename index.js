const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { flightRouter } = require("./routes/flight.router"); 
const { bookingRouter } = require("./routes/booking.router");

app.get("/", (req, res) => {
    res.send(`<h1>Basic API Endpoint</h1>`);
})
app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", bookingRouter);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        console.log(`server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("Connection Failed");
    }
})

const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const express = require("express");
const path = require("path");
const app = express();
const airtableRouter = require("./server/routes");


const PORT = process.env.PORT||8080;

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// //Added for Heroku deployment:
// app.use("/build", express.static(path.join(__dirname, "/build")));

app.use(express.static(path.join(__dirname,'build')));

app.use("/airtable", airtableRouter);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT, () => console.log("Server is Running On Port " + PORT));

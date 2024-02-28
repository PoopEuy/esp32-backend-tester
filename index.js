//import
import express from "express";
import * as dotenv from "dotenv";
import Router from "./routes/routes.js";
import axios from "axios";
import cors from "cors";
dotenv.config();
const app = express();

//env use

const PORT = process.env.PORT;
const APP_HOST = process.env.APP_HOST;

console.log("PORT : " + PORT);

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Router
app.use(Router);

app.use(cors());

// listen on port
app.listen(PORT, async function () {
  try {
    console.log("Connection has been established successfully.");
    setTimeout(
      await function () {
        cron_filter();
      },
      500
    );

    return console.log(`Server Berjalan pada 1port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// penggunaan node cron :
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

async function cron_filter() {
  console.log("masuk cron filter");
}

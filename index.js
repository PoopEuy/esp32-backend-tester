//import
import express from "express";
import * as dotenv from "dotenv";
import Router from "./routes/routes.js";
import axios from "axios";
import cors from "cors";
dotenv.config();
const app = express();

import * as cron from "node-cron";

//env use

const PORT = process.env.PORT;

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

async function cron_filter() {
  console.log("masuk cron ilter");

  await cron.schedule("00 00,10,20,30,40,50 * * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 0,6,12,18");
    getSiteDown();
  });
}

async function getSiteDown() {
  console.log("masuk fungsi");

  try {
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

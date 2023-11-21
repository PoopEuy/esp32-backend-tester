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

// epnggunaan node cron :
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

  await cron.schedule("00 10 04 * * *", () => {
    console.log("running a task cron aptold: ");
    prosesAptOld();
  });

  await cron.schedule("00 15 04 * * *", () => {
    console.log("running a task cron apt1v3: ");
    prosesApt1v3();
  });

  await cron.schedule("00 20 04 * * *", () => {
    console.log("running a task cron apt2: ");
    prosesApt2();
  });
}

async function prosesAptOld() {
  console.log("masuk proses data AptOld");
  const res = await axios.get(`${APP_HOST}:${PORT}/apt1OldProsesDegradasi`);
  const mess = await res.data.msg;
  console.log("mess : " + mess);
}

async function prosesApt1v3() {
  console.log("masuk proses data Apt1v3");
  const res = await axios.get(`${APP_HOST}:${PORT}/apt1ProsesDegradasi`);
  const mess = await res.data.msg;
  console.log("mess : " + mess);
}

async function prosesApt2() {
  console.log("masuk proses data Apt2");
  const res = await axios.get(`${APP_HOST}:${PORT}/apt2ProsesDegradasi`);
  const mess = await res.data.msg;
  console.log("mess : " + mess);
}

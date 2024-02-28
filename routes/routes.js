// import express
import express from "express";
import cors from "cors";

// import page controller
import { Home, About } from "../controllers/page.js";
import {
  restartKey,
  getModbusInfo,
  getDeviceInfo,
} from "../controllers/espController.js";

// init express router
const router = express.Router();
// Use CORS middleware
router.use(cors());

// Home route
router.get("/", Home);

// About route
router.get("/about", About);

//EspPoint
router.post("/api/restart", restartKey);
router.get("/api/get-modbus-info", getModbusInfo);
router.get("/api/get-device-info", getDeviceInfo);

// export default router
export default router;

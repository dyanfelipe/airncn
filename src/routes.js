const express = require("express");
const SessionControllers = require("./controllers/SessionControllers");
const SpotControllers = require("./controllers/SpotControllers");
const DashBoardControllers = require("./controllers/DashBoardControllers");
const BookingControllers = require("./controllers/BookingControllers");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const routes = express.Router();
const upload = multer(uploadConfig);
routes.post("/session", SessionControllers.store);

routes.get("/spots", SpotControllers.index);
routes.post("/spots", upload.single("thumbnail"), SpotControllers.store);

routes.get("/dashboard", DashBoardControllers.show);

routes.post("/spots/:id/booking", BookingControllers.store);
module.exports = routes;

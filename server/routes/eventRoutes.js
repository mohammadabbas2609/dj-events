import express from "express";
import {
  getLatestEvent,
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  myEvents,
} from "../controller/eventController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/").get(getAllEvents).post(verifyUser, createEvent);
router.get("/latest", getLatestEvent);
router.get("/myevents", verifyUser, myEvents);
router
  .route("/:id")
  .get(getEvent)
  .put(verifyUser, updateEvent)
  .delete(verifyUser, deleteEvent);

export default router;

import mongoose from "mongoose";
import geocoder from "../utils/nodeGeocoder.js";

const EventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "event-1_uqo4fx",
    },
    date: Date,
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    performers: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      type: [Number],
    },
  },
  { timestamps: true }
);

EventSchema.pre("save", async function (next) {
  try {
    const response = await geocoder(this.venue);

    this.location = [response[0].longitude, response[0].latitude];
    next();
  } catch (err) {
    console.log(err);
  }
});

const EventModel = mongoose.model("event", EventSchema);

export default EventModel;

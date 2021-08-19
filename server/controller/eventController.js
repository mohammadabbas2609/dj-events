import asyncHandler from "../middlewares/asyncHandler.js";
import EventModel from "../models/EventModel.js";
import imageUpload from "../utils/uploadImage.js";

// @desc - Get Latest Events
// @route - GET /api/event/latest
// @access - Public
export const getLatestEvent = asyncHandler(async (req, res, next) => {
  const event = await EventModel.find()
    .select("image date time title")
    .sort("date")
    .limit(4);

  res.status(200).json(event);
});

// @desc - Get All Events
// @route - GET /api/event/
// @access - Public
export const getAllEvents = asyncHandler(async (req, res, next) => {
  const pageSize = 4;
  const pageNumber = Number(req.query.pageNumber) || 1;
  const query = req.query.title
    ? {
        title: {
          $regex: req.query.title,
          $options: "i",
        },
      }
    : {};

  const documentCount = await EventModel.countDocuments();

  const totalPage = Math.ceil(documentCount / pageSize);

  const events = await EventModel.find({ ...query })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1))
    .sort("date");

  res.json({
    pages: totalPage,
    events,
  });
});

// @desc - Get Single Event
// @route - GET /api/event/:id
// @access - Public
export const getEvent = asyncHandler(async (req, res, next) => {
  let event = await EventModel.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event Not Found");
  }

  res.status(200).json(event);
});

// @desc - Create Events
// @route - POST /api/event/
// @access - Private & Admin
export const createEvent = asyncHandler(async (req, res, next) => {
  const { title, date, time, description, performers, venue, image } = req.body;
  let upload;
  if (image) {
    upload = await imageUpload.uploader.upload(image, {
      upload_preset: "DJ_EVENTS",
    });
  }

  await EventModel.create({
    user: req.user._id,
    title,
    date,
    time,
    description,
    performers,
    venue,
    image: image ? upload.public_id : undefined,
  });

  res.status(200).json({ success: true });
});

// @desc - Get particular Users event
// @route - GET /api/event/myevents
// @access - Private & Admin
export const myEvents = asyncHandler(async (req, res, next) => {
  const events = await EventModel.find({ user: req.user._id });
  res.status(200).json(events);
});

// @desc - Update Events
// @route - PUT /api/event/:id
// @access - Private & Admin
export const updateEvent = asyncHandler(async (req, res, next) => {
  const event = await EventModel.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (req.user._id.toString() !== event.user.toString()) {
    res.status(403);
    throw new Error("You cant update this event details");
  }

  let upload;
  if (req.body.image) {
    await imageUpload.uploader.destroy(event.image);
    upload = await imageUpload.uploader.upload(req.body.image, {
      upload_preset: "DJ_EVENTS",
    });
  }

  event.title = req.body.title || event.title;
  event.description = req.body.description || event.description;
  event.venue = req.body.venue || event.venue;
  event.date = req.body.date || event.date;
  event.time = req.body.time || event.time;
  event.image = upload ? upload.public_id : event.image;
  event.performers = req.body.performers || event.performers;

  await event.save();

  res.status(200).json({ success: true });
});

// @desc - Delete Events
// @route - DELETE /api/event/:id
// @access - Private & Admin
export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await EventModel.findById(req.params.id).select(
    "_id user image"
  );
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (
    req.user._id.toString() !== event.user.toString() &&
    req.role !== "admin"
  ) {
    res.status(403);
    throw new Error("You cant delete this event details");
  }

  await imageUpload.uploader.destroy(event.image, err => {
    if (err) {
      res.status(400);
      throw new Error("Unable to delete event");
    } else {
    }
  });
  await EventModel.findByIdAndDelete(event._id);

  res.status(200).json({
    sucess: true,
  });
});

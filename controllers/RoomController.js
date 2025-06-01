const path = require("path");
const fs = require("fs");
const Room = require("../models/room");
const cloudinary = require("cloudinary");
//setup
cloudinary.config({
  cloud_name: "ddxdxst4k",
  api_key: "652155751238188",
  api_secret: "PB9N2xN21GU75IQHGJd_whZl7y4",
});

class RoomController {
  static display = async (req, res) => {
    const Rooms = await Room.find().sort({ _id: -1 });
    try {
      // console.log(student)
      res.render("rooms/display", {
        error: req.flash("error"),
        success: req.flash("success"),
        rooms: Rooms,
      });
    } catch (error) {
      console.log(err);
    }
  };

  static list = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.render("rooms/list", { rooms });
    } catch (error) {
      console.log(error);
    }
  };

  static addForm = async (req, res) => {
    try {
      res.render("rooms/add");
    } catch (error) {
      console.log(error);
    }
  };

  static addRoom = async (req, res) => {
    try {
      // console.log(req.files);
      const {
        title,
        description,
        pricePerNight,
        maxGuests,
        durationDays,
        totalGuestsServed,
        rating,
        reviewsCount,
        isFeatured,
        amenities,
        extraPerBooking,
        extraPerPerson,
      } = req.body;
      // console.log(req.body)

      //image upload
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "student_images",
      });
      // console.log(imageUpload);

      let image = "";
      if (req.file) image = req.file.filename;

      const room = new Room({
        title,
        description,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        pricePerNight,
        maxGuests,
        durationDays,
        totalGuestsServed,
        rating,
        reviewsCount,
        isFeatured: isFeatured === "on",
        amenities: amenities.split(",").map((i) => i.trim()),
        extraService: {
          perBooking: extraPerBooking,
          perPerson: extraPerPerson,
        },
      });

      await room.save();
      req.flash("success", "Room Added Successfully");
      res.redirect("/rooms/display");
    } catch (err) {
      console.log(err);
    }
  };

  static editForm = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.render("rooms/edit", { room });
    } catch (error) {
      console.log(error);
    }
  };

  static updateRoom = async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(id)
      const {
        title,
        description,
        pricePerNight,
        maxGuests,
        durationDays,
        totalGuestsServed,
        rating,
        reviewsCount,
        isFeatured,
        amenities,
        extraPerBooking,
        extraPerPerson,
        // image
      } = req.body;

      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).send("Room not found");

      room.title = title;
      room.description = description;
      room.pricePerNight = pricePerNight;
      room.maxGuests = maxGuests;
      room.durationDays = durationDays;
      room.totalGuestsServed = totalGuestsServed;
      room.rating = rating;
      room.reviewsCount = reviewsCount;
      room.isFeatured = isFeatured === "true";
      room.amenities = amenities.split(",").map((i) => i.trim());
      room.extraService.perBooking = extraPerBooking;
      room.extraService.perPerson = extraPerPerson;
      // room.image.url = image.url
      await room.save();
      res.redirect("/rooms/display");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteRoom = async (req, res) => {
    try {
      const id = req.params.id;
      await Room.findByIdAndDelete(id);
      req.flash("success","Room Deleted Successfully")
      res.redirect("/rooms/display");
    } catch (error) {
      console.log(error);
    }
  };
  // GET /roomView/:id
  static viewRoom = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      // if (!room) return res.status(404).send("Room not found");
      res.render("rooms/view", { room }); // Adjust path as per your setup
    } catch (error) {
      console.error(error);
      // res.status(500).send("Server error");
    }
  };

  
}

module.exports = RoomController;

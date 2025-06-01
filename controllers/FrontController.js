const RoomModel = require("../models/room");
const allAmenities = [
  "Conditioning", "Lawn", "TV Cable", "Barbeque", "Microwave",
  "Washer", "Dryer", "Refrigerator", "WiFi", "Gym",
  "Sauna", "Window Coverings", "Laundry", "Swimming Pool"
];

class FrontController {
  static home = async (req, res) => {
    try {
      // res.send("home page")
      res.render("home");
    } catch (err) {
      console.log(err);
    }
  };

  static rooms = async (req, res) => {
    try {
      const room = await RoomModel.find();
      // console.log(room);

      res.render("room", { room });
    } catch (err) {
      console.log(err);
    }
  };

  static restaurant = async (req, res) => {
    try {
      // res.send("home page")
      res.render("restaurant");
    } catch (err) {
      console.log(err);
    }
  };

  static contact = async (req, res) => {
    try {
      // res.send("home page")
      res.render("contact");
    } catch (err) {
      console.log(err);
    }
  };

  static about = async (req, res) => {
    try {
      // res.send("home page")
      res.render("about");
    } catch (err) {
      console.log(err);
    }
  };

  static SignUp = async (req, res) => {
    try {
      // res.send("home page")
      res.render("SignUp",{
        error: req.flash("error")        
      });
    } catch (err) {
      console.log(err);
    }
  };

  static Login = async (req, res) => {
    try {
      // res.send("home page")
      res.render("Login",{
        success: req.flash("success"),
        error: req.flash("error")
      });
    } catch (err) {
      console.log(err);
    }
  };

  static dashboard = async (req, res) => {
    try {
      // res.send("home page")
      res.render("dashboard", {
        success: req.flash("success")
      });
    } catch (err) {
      console.log(err);
    }
  };

  static RoomDetails = async (req, res) => {
    try {
      const room = await RoomModel.findById(req.params.id)
      res.render("rooms/room-details",{
        room,
        allAmenities,
    });
    } catch (error) {
        console.log(error)
    }
  };
}

module.exports = FrontController;

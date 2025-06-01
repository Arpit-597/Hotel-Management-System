const express = require("express");
const route = express.Router();
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/AdminController");
const UserController = require("../controllers/UserController");
const RoomController = require("../controllers/RoomController");
const BookingController = require("../controllers/BookingController");
const checkAuth = require("../middlewares/checkAuth");

route.get("/", FrontController.home);
route.get("/about", FrontController.about);
route.get("/room", FrontController.rooms);
route.get("/restaurant", FrontController.restaurant);
route.get("/contact", FrontController.contact);
route.get("/dashboard", checkAuth, FrontController.dashboard);
route.get("/login", FrontController.Login);
route.get("/signup", FrontController.SignUp);

route.post("/adminInsert", AdminController.AdminInsert);
route.post("/verifyLogin", AdminController.verifyLogin);
route.get("/logout", AdminController.logout);

route.get("/booking/display", checkAuth, BookingController.display);
route.get("/rooms/display", checkAuth, RoomController.display);

route.post("/rooms/add", checkAuth, RoomController.addRoom);
route.get("/roomDelete/:id",checkAuth,RoomController.deleteRoom);
route.get("/roomEdit/:id",checkAuth,RoomController.editForm);
route.post("/roomsupdate/:id",checkAuth,RoomController.updateRoom);
route.get('/roomView/:id', RoomController.viewRoom);


route.get('/detailsRoom/:id',FrontController.RoomDetails)

route.post("/booking/add",BookingController.insertBooking)
module.exports = route;

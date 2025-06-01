const BookingModel = require("../models/booking");
const booking = require("../models/booking");
const RoomModel = require("../models/room");

// const BookingModel = require("../models/Booking")
class BookingController {
  static display = async (req, res) => {
    try {
      const booking = await BookingModel.find().sort({ _id: -1 });
      // console.log(student)
      res.render("booking/display", {
        name: req.user.name,
        std: booking,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // static insertBooking = async(req,res)=>{
  //     try{
  //         // console.log(req.body)
  //         const{
  //             user,
  //             room,
  //             checkIn,
  //             checkOut,
  //         } = req.body;
  //         const exisitingBooking = await booking.findOne({room})
  //         if(exisitingBooking){
  //             req.flash("error","Room already Booked")
  //             return res.redirect("/booking/display")
  //         }
  //         // const hashPassword = await bcrypt.hash(password,10)
  //         const result = await BookingModel.create({
  //             user,
  //             room,
  //             checkIn,
  //             checkOut,
  //         })
  //         req.flash("success","Room Booked Successfully")
  //         return res.redirect("/booking/display")
  //     }
  //     catch(err){
  //         console.log(err)
  //     }
  // }

  // static insertBooking = async (req, res) => {
  //   try {
  //       console.log(req.body)
  //     const {
  //           checkin,
  //           checkout,
  //           guests,
  //           addServicePerBooking,
  //           addServicePerPerson,
  //           totalPrice
  //       } = req.body;

  //      const result = await BookingModel.create({
  //           checkin,
  //           checkout,
  //           guests,
  //           addServicePerBooking: addServicePerBooking || false,
  //           addServicePerPerson: addServicePerPerson || false,
  //           totalPrice
  //       });

  //   //   console.log("Booking inserted successfully:", result);
  //     res.status(201).json({
  //       message: "Booking created successfully",
  //       booking: savedBooking,
  //     });
  //   } catch (error) {
  //     // console.error('❌ Error inserting booking:', error);
  //     // throw error;
  //     console.log(erro);
  //   }
  // };

  static insertBooking = async (req, res) => {
    try {
      // console.log(req.body);

      const { checkin, checkout, guests, select01, select02 } = req.body;
      // console.log(req.body);
      const totalPrice = "160"; // or calculate dynamically

      const result = await BookingModel.create({
        checkin: new Date(checkin),
        checkout: new Date(checkout),
        guests,
        addServicePerBooking: select01 === "on",
        addServicePerPerson: select02 === "on",
        totalPrice,
      });

      res.redirect("/booking/display");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = BookingController;

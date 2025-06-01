// const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel =require('../models/user')

class AdminController {
  static AdminInsert = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      //   console.log(req.body);
      const isEmail = await UserModel.findOne({ email });
      if (!isEmail) {
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await UserModel.create({
          name,
          email,
          password: hashPassword,
        });
        req.flash("success", "Account Successfully Registered");
        return res.redirect("/login");
      } else {
        req.flash("error", "Email already registered");
        return res.redirect("/signup");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // Include role in token payload
          const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role }, // role bhi add kiya
            process.env.jwt_secret_key,
            { expiresIn: "1d" }
          );

          // Store token in HTTP-only cookie
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          req.flash("success", "Logged In Successfully");

          // Redirect based on role
          if (user.role === "admin") {
            return res.redirect("/dashboard");
          } else if (user.role === "user") {
            return res.redirect("/"); // ya user ke liye jo home page ho
          } else {
            // Agar koi aur role hai toh default redirect
            return res.redirect("/");
          }
        } else {
          req.flash("error", "Email or Password not Match");
          return res.redirect("/login");
        }
      } else {
        req.flash("error", "Email not Found");
        return res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
      // Optionally handle errors by redirecting or showing a message
      req.flash("error", "Something went wrong. Please try again.");
      return res.redirect("/login");
    }
  };


  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      // req.flash("success", "Logged Out Successfully");
      return res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminController;

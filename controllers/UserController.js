const UserModel = require("../models/user")
class UserController{
    static display = async(req,res)=>{
        try {
            // console.log("Hello")
            res.render("users/display",{
            })
        } catch (error) {
            
        }
    }
}

module.exports = UserController
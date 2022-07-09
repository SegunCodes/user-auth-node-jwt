const User = require("../models/user")
const {validationResult} = require("express-validator")
// const user = require("../models/user")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save().then(
        () => {
          res.status(201).json({
            message: 'user saved successfully!'
          });
        }
      ).catch(
        (err) => {
          res.status(400).json({
            error: err
          });
        }
      );
}

exports.signin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json(err)
        }
        //Authenticate user
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        //put token into cookie
        res.cookie('token', token, {expire: new Date() + 1})
        //send response
        const {_id, name, email} = user
        return res.json({
            token,
            user:{
                _id,
                name,
                email
            }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User sign out successful"
    })
}
const express = require("express")
const { signup } = require("../controllers/user")
const { signin } = require("../controllers/user")
const { signout } = require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()

router.post('/signup', [
    check("name", "Name should at least be 3 characters").isLength({min: 3}),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password should at least be 6 characters").isLength({min: 6}),
] ,signup)

router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router
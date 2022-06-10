const jwt = require('jsonwebtoken')
const {BadRequestError} = require("../errors")

const login = (req, res) => {
    const {username, password} = req.body
// mongoose validations
// joi 
// check in the controller
    console.log(username, password)
    if (!username || !password) {
        throw new BadRequestError('Please provide all credentials')
    }
    
    // just for demo normally provided by DB
    const id = new Date().getDate()

    // try to keep payload small for better experience of user
    // just for demo in production use long, complex and unguessable string value!!!!
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})
    // res.send(`fake login/Signup Route`)
    res.status(200).json({msg: 'user created', token})
}

const dashboard = (req, res) => {
    /* const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('no tokens provided', 401)
    }
    console.log(req.headers)

    const token = authHeader.split(' ')[1]
    console.log(token) */
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login, dashboard
}
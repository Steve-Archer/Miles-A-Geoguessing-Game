const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
class UserController {
    getAllUsers = (req, res)=>{
        User.find()
            .then(allUsers=>{
                res.json({results: allUsers})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }
    register = (req, res) => {
        User.find({name:req.body.name})
            .then(user=>{
                console.log(user)
                if(user.length===0){
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id,
                                name: user.name
                            }, process.env.SECRET_KEY)
                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({message: "success", user: user})
                        })
                        .catch(err => res.json(err))
                }else{
                    res.json({errors: {name: {message:"That name is already taken."}}})
                }
            })
            .catch(err=>console.log(err))
    }

    login = async(req, res) => {
        const user = await User.findOne({ name: req.body.name })
        if(user === null) {
            return res.json({error: "Invalid. No User."})
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword) {
            return res.json({error: "Password is incorrect"})
        }
        const userToken = jwt.sign({
            id: user._id,
            name: user.name
        }, process.env.SECRET_KEY)
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ message: "success!" })
    }
    logout = (req, res) => {
        res.clearCookie('usertoken')
        res.sendStatus(200)
    }
    getLoggedInUser = (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        User.findOne({_id: decodedJWT.payload.id})
            .then(user=>{
                res.json({results: user})
            })
            .catch(err=>{
                res.json(err)
            })
    }
    endGame = (req, res) => {
        console.log("testing")
        User.findOneAndUpdate(
            {_id: req.params.id},
            req.body
            )
            .then(user=> {
                res.json({results: user})
            })
            .catch(err=>console.log(err))
    }
}
module.exports = new UserController()
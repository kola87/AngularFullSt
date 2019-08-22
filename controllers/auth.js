const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({
        email: req.body.email
    })
    if(candidate){
        //check password, user exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //need to generate key/token - passwords identically 
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            //passwords does not matched
            res.status(401).json({
                message: 'Password does not matched, Try again!'
            })
        }
    }else{
        //user dose not exist, error
        res.status(404).json({
            message: 'User or email not found!'
        })
    }
}


module.exports.register = async function(req, res){
   //email password
   const candidate = await User.findOne({email: req.body.email})
   if(candidate){
       //user exist, need show error
    res.status(409).json({
        message: 'This email already exist!'
    })
   }else{
       // need create new user
       const salt = bcrypt.genSaltSync(10)
       const password = req.body.password
       const user = new User({
           email: req.body.email,
           password: bcrypt.hashSync(password, salt)
       })
       try{
             await user.save()
             res.status(201).json(user)
       }catch(e){
           //resolve an error
           errorHandler(res, e)
       }
     
   }
}
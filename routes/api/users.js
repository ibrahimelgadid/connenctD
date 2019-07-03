const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/exports').secretOrKey;
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');;
const validateLoginInput = require('../../validation/login');

// post register
router.post('/register', (req,res)=>{

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){return res.status(400).json(errors)}

    User.findOne({email:req.body.email},(err,user)=>{
        if(err) throw err;
        if(user){
            errors.email ='this email already exist';
            return res.status(400).json(errors);
        }else{
            
           let newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
           });

            bcrypt.genSalt(10, (err,salt)=>{
                if(err) throw err;
                bcrypt.hash(newUser.password, salt,(err,hashed)=>{
                    if(err) throw err;
                    newUser.password = hashed; 
                    newUser.save((err, newuser)=>{
                        if(err) throw err;
                        res.json(newuser);
                        })
                    })
                });
        }
    })
})

//post login 
router.post('/login',(req,res)=>{

    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){return res.status(400).json(errors)}

    User.findOne({email:req.body.email},(err,user)=>{
        if(err)throw err;
        if(!user){
            errors.email='no user with this email';
            return res.status(400).json(errors)
        }else{
            bcrypt.compare(req.body.password, user.password,(err,match)=>{
                if(err) throw err;
                if(!match){
                    errors.password = 'Incorrect password';
                    return res.status(400).json(errors)
                }else{
                    jwt.sign({
                        id:user.id,
                        name:user.name,
                        avatar:user.avatar
                    },secretKey,{
                        expiresIn:60 * 60 * 24,   
                    },(err, token)=>{
                        res.json({
                            success:true,
                            token:'Bearer ' +token
                        })
                    })
                }
            })
        }
    })
})

// get current user;

router.get('/current', passport.authenticate('jwt', {session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})


module.exports = router;
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/userModel');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message:"Email Already Exist"
            })
        }
        else{
            bcrypt.hash(req.body.password,null,null,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                        _id : new mongoose.Types.ObjectId,
                        name:req.body.name,
                        email:req.body.email,
                        password:hash

                    })
                    user
                    .save()
                    .then(()=>{
                        res.status(200).json({
                            message:"User created Sucessfully"
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
})

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length > 1){
            return res.status(401).json({
                error:"Authentication failed"
            })
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        error:"Authentication failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1hr"
                    }
                    );
                    return res.status(200).json({
                        message:"Authentication Successfull",
                        token:token,
                        username:user[0].name
                    })
                }
                return res.status(401).json({
                    error:"Authentication failed"
                })
            })
        }
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
})

module.exports = router;

//const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi'); 
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const {User} = require('../Models/user');
const router = express.Router();

router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({email:req.body.email});   
     if(!user) return res.status(400).send("Invalid Username or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Username or Password");

    const token = user.generateAuthToken();
    res.send(token); 
});

function validate(req) {
    const schema = {
      email: Joi.string().min(10).max(255).required().email(),
      password:Joi.string().min(5).max(1024).required(),
    };
  
    return Joi.validate(req, schema);
  }


module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const {Customers ,validateCustomer} = require('../Models/customer');
const router = express.Router();

router.get('/',async(req,res)=>{
    const customers = await Customers.find().sort('name');
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customer = await Customers.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  });

router.post('/', async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customers({
        name: req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', async(req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone},
        {new:true})
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
   
    res.send(customer);
  });
  
router.delete('/:id', async(req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
  
    res.send(customer);
  });
  
  module.exports = router;
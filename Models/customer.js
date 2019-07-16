const mongoose = require('mongoose');
const Joi = require('joi');
const customerSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number,
        required:true
    }
  });
  
  const Customers = mongoose.model('Customers',customerSchema);

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().required(),
      phone: Joi.number().required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.customers = Customers;
  exports.validateCustomer = validateCustomer;
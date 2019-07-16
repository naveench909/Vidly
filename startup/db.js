const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect("mongodb+srv://node:node@cluster0-daffy.mongodb.net/test?retryWrites=true&w=majority", ()=>{
        winston.info('connected to the database...')});
};
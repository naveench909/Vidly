const winston = require('winston');
require('express-async-errors');

module.exports = function(){
/*
    process.on('uncaughtException', (ex)=>{
    winston.error(ex.message, ex);
    process.exit(1);
    });
*/
/*winston.handleExceptions(
    new winston.transports.Console({colorize:true , prettyPrint: true}),
    new winston.transports.File({filename: 'uncaughtfile.log'}));
    */
process.on('unhandledRejection', (ex)=>{
    throw ex; 
});

winston.add(new winston.transports.File({filename: 'logfile.log'}));
};
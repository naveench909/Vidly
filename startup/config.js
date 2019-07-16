
const config = require('config');

module.exports = function(){
    //run this code when you set the Vidly_jwtPrivateKey = mySecureKey
    if(!config.get('jwtPrivateKey')){
        throw new ERROR('FATAL ERROR : jwtPrivateKey is not defined');    
}
}

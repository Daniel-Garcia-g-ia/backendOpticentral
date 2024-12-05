const jwt = require('jsonwebtoken');
const ENV = require ('../config')


function generateToken (userID){
  const payload = {userID};
  const options = { expiresIn: 60*60*8};
  const token = jwt.sign(payload, ENV.config.secret_key, options);
  return token
}

function verifyToken (token){

    return new Promise ((resolve, reject )=>{
        try{
            const decoded = jwt.verify (token, ENV.config.secret_key);
            resolve(decoded);
    
        } catch(err){
            reject(new Error ('Token invalido')); 
        }
    })
   
   
}

module.exports ={
    generateToken,
    verifyToken
}
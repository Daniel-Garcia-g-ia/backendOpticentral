const Model = require ('../models/userModel');

async function  getUsers (){
 const users = await Model.find();
 return users
}

async function getOneUser(email){
    const user = await Model.findOne({email});
    return user
}


module.exports ={
    getUsers,
    getOneUser
}
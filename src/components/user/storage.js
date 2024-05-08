const Model = require ('../userModel/model');

async function  getUsers (){
 const users = await Model.find();
 return users
}


module.exports ={
    getUsers
}
const model = require ('../models/processModel');

async function  get (){   
    const process = await model.find();
    return process
   }


module.exports={
    get
}
const model = require ('../models/equipmentModel');

async function  get (){
    
    
    const equipments = await model.find();
    return equipments
   }


module.exports={
    get
}
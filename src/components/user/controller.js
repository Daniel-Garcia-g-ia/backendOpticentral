const store = require ('./storage');
const ENV = require ('../../../config');

function getUsers (){
    return new Promise ((resolve, reject)=>{
        store.getUsers()
            .then((users)=>{
                resolve(users)

            }).catch (e=>{
                reject(e)
            })
    })
}

module.exports = {
    getUsers
}
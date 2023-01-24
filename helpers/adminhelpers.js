var db=require('../config/connection')
var collection=require('../config/collection')
const objectId=require('mongodb').ObjectId
const bcrypt = require('bcrypt')



module.exports={
    getAllusers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
     },
  
     deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: objectId(userId) }).then((response) => {
                resolve(response)
            }).catch(err => reject(err))

        })
    }, 
    editUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(id)}).then((data)=>{
            resolve(data);
           // console.log(data);
        }); 
        })
    },
    editUserDetails:(id,data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(id)},{
                $set:{
                    username:data.username,
                    age:data.age,
                    email:data.email
                }
            }).then((response)=>{
               // console.log(response); 
                resolve();
            });
        });
    },


    addUser:(userData)=>{
        console.log(userData)
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            const{conformpassword ,...rest}=userData
            db.get().collection(collection.USER_COLLECTION).insertOne(rest).then((res) => {
                console.log(res);
                resolve(res)
            })
           
        })
       
    }
}
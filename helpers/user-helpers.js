var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')

// const { response } = require('express')

module.exports = {
    doSignup: (userData) => {
        console.log(userData)
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            const { conformpassword, ...rest } = userData
            db.get().collection(collection.USER_COLLECTION).insertOne(rest).then((res) => {
                console.log(res);
                resolve(res)
            })

        })

    }, doLogin: (username, password) => {
        console.log(username)
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ username }).then((res) => {
                if(res){
                bcrypt.compare(password, res.password, function (err, result) {
                    if (result) {
                        resolve(res)
                    } else {
                        reject()
                    }
                });
            }else{
                reject()
            }

            })
        })
    },
    
    findUserwithName: ({ username }) => {
        return new Promise(async(resolve, reject) => {
            try {
                let users= await db.get().collection(collection.USER_COLLECTION).find({ username: new RegExp(username) }).toArray()
                    if (users) {
                        //console.log(users);
                        resolve(users)
                    } else {
                        reject()
                    }
                

            } catch (err) {
                reject(err)
            }
        })
    }
}
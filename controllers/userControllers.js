const CryptoJS = require(`crypto-js`)
const auth = require(`../middlewares/auth`)
const User = require(`../models/User`)

//GET ALL USERS - return all the users info
module.exports.getAllUsers = async() => {
    return await User.find().then(result => result)}

//SiGN UP A USER - return result
module.exports.signUp = async (reqBody) => {
    const {firstName, lastName, email, password} = reqBody
    const newUser = new User({
        firstName, lastName, email, 
        password: CryptoJS.AES.encrypt(password, process.env.ACCESS_TOKEN_SECRET).toString()
    })
    return await newUser.save().then(result => result)}

//CHECK IF EMAIL EXIST - return true or false
module.exports.checkEmail = async (email) => {
    return await User.findOne({email}).then(result => result ? true : false)}

//LOGIN - return a token or false
module.exports.login = async (reqBody) => {
    return await User.findOne({email: reqBody.email}).then((result) => {
        if(result){
            const decryptedPw = CryptoJS.AES.decrypt(result.password, process.env.ACCESS_TOKEN_SECRET).toString(CryptoJS.enc.Utf8)
            if(reqBody.password === decryptedPw){
                return {token: auth.createToken(result)}
            }else{
                return false
            }
        }else{
            return false
        }
    })
}

//RETRIEVE USER INFORMATION - return user info or error
module.exports.profile= async (userID) => {
    return await User.findById(userID).then(result => result ? result : error)}

//UPDATE USER INFORMATION - return updated user info or error *password should have a dedicated update form*
module.exports.update = async (userId, reqBody) => {
    return await User.findByIdAndUpdate(userId, {$set: reqBody}, {new:true}).then(result => result ? result : error)}

//UPDATE PASSWORD OF A USER - return updated password in hash or error
module.exports.updatePassword = async (userId, reqBody) => {
    const newPassword = {password: CryptoJS.AES.encrypt(reqBody.password, process.env.ACCESS_TOKEN_SECRET).toString()}
    return await User.findByIdAndUpdate(userId, {$set: newPassword}).then(result => result ? result : error)}

//SET ISADMIN TO TRUE - return user info with isAdmin-true or false
module.exports.adminTrue = async (reqBody) =>{
    return await User.findOneAndUpdate({email: reqBody.email}, {$set: {isAdmin: true}}, {new:true}).then(result => result ? result : false)}

//SET ISADMIN TO FALSE - return user info with isAdmin-false or false
module.exports.adminFalse = async (reqBody) =>{
    return await User.findOneAndUpdate({email: reqBody.email}, {$set: {isAdmin: false}}, {new:true}).then(result => result ? result : false)}

//DELETE USER - return true or false
module.exports.deleteUser = async (reqBody) => {
    return await User.findOneAndDelete({email: reqBody.email}).then(result => result ? true : false)
}
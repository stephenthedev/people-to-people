/******************************************************************************
User.js
Author: mcdo7187@fredonia.edu
Date: 4/6/2015
Version: 0.0.5
*******************************************************************************/

/*Personal Notes

hashSync(data, salt)
data - [REQUIRED] - the data to be encrypted.
salt - [REQUIRED] - the salt to be used in encryption.
*/

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//Creating a schema for Users
var userSchema = mongoose.Schema({
    user: {
		username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
		firstName: String,
		lastName: String
		location: String
    }
});


//Hashing a password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//Checking a passwords
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUser = function(request, response){

	this.user.name = request.body.name;
	this.user.address = request.body.address;
	 this.user.save();
	response.redirect('/user');
};

// Makes the model for the schema useful
module.exports = mongoose.model('User', userSchema);
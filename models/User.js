const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required']
	},
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minLength: [4, 'Password must be at least 4 characters long']
	}
})

const User = mongoose.model("user", userSchema)
module.exports = User
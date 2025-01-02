const mongoose = require("mongoose");

//------------------------------------------------
//NE PAS MODIFIER ! NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

const userSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	token: String,
	level: {
		type: Number,
		default: 1,
	},
	avatar: {
		type: String,
		default: "avatar.jpg",
	},
	dialogue_progress: { dialogues_done: [String] },
	practice_progress: { practices_done: [String] },
});

const User = mongoose.model("users", userSchema);

module.exports = User;

const mongoose = require("mongoose");

//------------------------------------------------
//NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

const favoriteSchema = mongoose.Schema({
	Word_JP: String,
	Word_EN: String,
	Romanji: String,
	Grammar: String,
	isBook: Boolean,
	id_user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Favorite = mongoose.model("favorites", favoriteSchema);

module.exports = Favorite;

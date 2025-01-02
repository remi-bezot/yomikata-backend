const mongoose = require("mongoose");

//------------------------------------------------
//NE PAS MODIFIER ! NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

const lineSchema = mongoose.Schema({
	speaker: String,
	japanese: String,
	romanji: String,
	english: String,
});

const exerciseSchema = mongoose.Schema({
	word_jp: String,
	good_answer: String,
	wrong_answer_a: String,
	wrong_answer_b: String,
	wrong_answer_c: String,
});

const themeSchema = mongoose.Schema({
	theme: String,
	speaker_number: Number,
	lines: [lineSchema],
	exo: [exerciseSchema],
});

const lessonSchema = mongoose.Schema({
	level: Number,
	themes: [themeSchema],
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;

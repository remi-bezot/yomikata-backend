var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Lesson = require("../models/lessons");

//Affiche toutes les lecons
router.get("/showAllLessons/:token", (req, res) => {
	let token = req.params.token;
	User.findOne({ token: token }).then((dataUser) => {
		if (dataUser) {
			let userLevel = dataUser.level;
			Lesson.find({ level: userLevel }).then((data) => {
				res.json({ result: true, data: data });
			});
		} else {
			res.json({ result: false });
		}
	});
});

// Affiche une leçon grace a son Id
router.get("/showOne/:lessonId/:token", (req, res) => {
	let lessonId = req.params.lessonId;
	let token = req.params.token;
	User.findOne({ token: token }).then((dataUser) => {
		if (dataUser) {
			Lesson.findById(lessonId).then((data) => {
				if (data) {
					res.json({ result: true, data: data });
				} else {
					res.json({ result: "No lesson found" });
				}
			});
		} else {
			res.json({ result: "No user connected" });
		}
	});
});

//UPDATE DIALOGUE PROGRESS NEXT BUTTON
// router.post("/Progress_Dial/:user_id/:lesson_id", (req, res) => {
// 	let user_id = req.params.user_id;
// 	let lesson_id = req.params.lesson_id;

// 	User.findByIdAndUpdate(
// 		user_id,
// 		{
// 			$push: { "dialogue_progress.dialogues_done": lesson_id }, // Ajoute un nouvel élément au tableau
// 		} // Retourne le document après mise à jour
// 	)
// 		.then((updatedProgress) => {
// 			if (updatedProgress) {
// 				res.json({ result: true, updatedProgress });
// 			} else {
// 				res.json({ result: false, message: "Élément non trouvé" });
// 			}
// 		})
// 		.catch((err) => {
// 			res.json({ result: false, error: err.message });
// 		});
// });

// //UPDATE EXERCICE PROGRESS NEXT BUTTON
// router.post("/Progress_Pract/:user_id/:practice_id", (req, res) => {
// 	let user_id = req.params.user_id;
// 	let lesson_id = req.params.lesson_id;

// 	User.findByIdAndUpdate(
// 		user_id,
// 		{
// 			$push: { "practice_progress.practices_done": lesson_id }, // Ajoute un nouvel élément au tableau
// 		} // Retourne le document après mise à jour
// 	)
// 		.then((updatedPractice) => {
// 			if (updatedPractice) {
// 				res.json({ result: true, updatedPractice });
// 			} else {
// 				res.json({ result: false, message: "Élément non trouvé" });
// 			}
// 		})
// 		.catch((err) => {
// 			res.json({ result: false, error: err.message });
// 		});
// });

module.exports = router;

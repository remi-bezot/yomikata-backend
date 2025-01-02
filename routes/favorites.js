var express = require("express");
var router = express.Router();

require("../models/connection");
const Favorite = require("../models/favorites");
const User = require("../models/users");

router.get("/showFavorites/:token", (req, res) => {
	const token = req.params.token;

	User.findOne({ token: token }).then((data) => {
		if (data) {
			Favorite.find({ id_user: data._id })
				.populate("id_user")
				.then((data) => {
					res.json({ result: data });
				});
		}
	});
});
router.post("/createFavorite/:token", (req, res) => {
	User.findOne({ token: req.params.token })
		.then((data) => {
			Favorite.findOne({
				id_user: data._id,
				Word_JP: req.body.wordjp,
			})
				.then((element) => {
					console.log(element, "iciiiiiii");

					if (!element) {
						const newFavorite = new Favorite({
							Word_JP: req.body.wordjp,
							Word_EN: req.body.worden,
							Romanji: req.body.romanji,
							Grammar: req.body.grammar,
							isBook: req.body.isbook,
							id_user: data._id,
						});
						newFavorite
							.save()
							.then((newDoc) => {
								res.json({
									result: true,
									status: true,
									data: newDoc,
									info: "ADDED",
								});
							})
							.catch((err) => {
								res.status(500).json({
									result: false,
									status: false,
									message: "Error saving favorite",
									error: err,
								});
							});
					} else {
						console.log((element, "va etre supprimé"));

						element.deleteOne();
						res.status(400).json({
							result: false,
							status: false,
							message: "Favorite deleted",
						});
					}
				})
				.catch((err) => {
					res.status(500).json({
						result: false,
						status: false,
						message: "Error checking favorite",
						error: err,
					});
				});
		})
		.catch((err) => {
			res.status(500).json({
				result: false,
				status: false,
				message: "Error finding user",
				error: err,
			});
		});
});

router.delete("/deleteFavorite/:token", (req, res) => {
	User.findOne({ token: req.params.token }).then((data) => {
		if (data) {
			Favorite.findByIdAndDelete(req.body.id)
				.then((data) => {
					if (data) {
						res.json({ result: "word deleted" });
					} else {
						res.status(404).json({ result: "word not found" });
					}
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({ result: "error", error: err });
				});
		}
	});
});

module.exports = router;

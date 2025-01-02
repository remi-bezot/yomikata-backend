var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const { getWords } = require("../modules/wanikani");

//ROUTE RESEARCH = Post un mot en anglais. Premier fetch dans API Jisho.
//Traitement de la donnée et récupération : Kanji, Furigana, Gammaire.
//Envoi dans le deuxieme fetch pour récupérer le Romanji
router.get("/getWord/:word", (req, res) => {
	const word = req.params.word;
	fetch(`https://jisho.org/api/v1/search/words?keyword=${word}`)
		.then((response) => response.json())
		.then((data) => {
			if (!data.data || data.data.length === 0) {
				// Si aucun mot n'est trouvé, retourner une erreur avant de faire le deuxième fetch
				return res.json({
					error: "Can't find this word.",
				});
			}
			const words = data.data?.slice(0, 3).map((item) => ({
				Kanji: item.slug,
				WaniKani: item.tags.slice(0, 3),
				English: item.senses[0].english_definitions.slice(0, 3),
				Grammar: item.senses[0].parts_of_speech.slice(0, 3),
				Hiragana: item.japanese.slice(0, 3).map((jap) => ({
					word: jap.word,
					reading: jap.reading,
				})),
			}));
			const wanikaniLow = getWords(words);

			fetch(
				`https://jlpt-vocab-api.vercel.app/api/words?word=${wanikaniLow.Kanji}`
			)
				.then((response) => response.json())
				.then((jlptData) => {
					res.json({
						wanikaniLow,
						romaji: jlptData.words[0]?.romaji || "No romanji",
					});
				})
				.catch((error) => {
					res.json({ error: "premier fetch JLPT" });
				});
		})
		.catch((error) => {
			res.json({ error: "deuxieme fetch" });
		});
});

//ROUTE RANDOM = Get un mot au hasard
//AJOUTER SECOND FETCH POUR GRAMMAIRE DU MOT

router.get("/random/", (req, res) => {
	fetch("https://jlpt-vocab-api.vercel.app/api/words/random")
		.then((response) => response.json()) // Convertit la réponse en JSON
		.then((word) => {
			res.json({ word: word });
		})
		.catch((error) => {
			console.error("Erreur lors de la récupération des données :", error);
		});
});

module.exports = router;

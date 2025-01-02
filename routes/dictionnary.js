var express = require("express");
var router = express.Router();
//------------------------------------------------
//NE PAS MODIFIER ! NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

router.get("/:word", (req, res) => {
	let word = req.params.word;
	fetch(`https://jlpt-vocab-api.vercel.app/api/words?word=${word}`)
		.then((response) => response.json())
		.then((jlptData) => {
			fetch(`http://beta.jisho.org/api/v1/search/words?keyword=${word}`)
				.then((response) => response.json())
				.then((jishoData) => {
					let grammar = ["mot introuvable"];
					if (jishoData && jishoData.data && jishoData.data.length > 0) {
						const firstItem = jishoData.data[0];
						grammar = firstItem.senses[0]?.parts_of_speech || [
							"mot introuvable",
						];
					}
					res.json({
						jlpt: jlptData.words,
						jisho: {
							grammar: grammar,
						},
					});
				});
		});
});

module.exports = router;

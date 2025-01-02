function getWords(words) {
	const filtered = words
		.filter((word) => word.WaniKani.length)
		.map((word) => ({
			...word,
			level: parseInt(word.WaniKani[0].replace("wanikani", "")),
		}))
		.sort((a, b) => a.level - b.level);

	return filtered[0] || null || words[0];
}

module.exports = { getWords };

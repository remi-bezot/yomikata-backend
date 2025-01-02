const request = require("supertest");
const app = require("./app");

describe("GET /word/random", () => {
	it("should give you a random data about a japanese word", async () => {
		const response = await request(app).get("/word/random").expect(200);

		// Affiche les logs pour débogage
		console.log(response.status, response.body);

		// Vérifie que la réponse correspond à l'objet attendu
		expect(response.body).toMatchObject({
			word: {
				word: expect.any(String),
				meaning: expect.any(String),
				furigana: expect.any(String),
				romaji: expect.any(String),
				level: expect.any(Number),
			},
		});
	});
});

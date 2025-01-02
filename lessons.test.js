const request = require("supertest");
const app = require("./app");

it("GET ShowAllLessons", async () => {
  const res = await request(app).get(
    `/lessons/showAllLessons/_w2_R3IVDGZIlgPxysRf7B4U8wBfkp7f`
  );

  expect(res.statusCode).toBe(200);
  expect(res.body.data).toBeInstanceOf(Array);
});

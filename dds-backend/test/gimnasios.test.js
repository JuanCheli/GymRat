const request = require("supertest");
const app = require("../index");

describe("GET /api/gimnasios", function () {
  it("Devolveria todos los gimnasios", async function () {
    const res = await request(app)
      .get("/api/gimnasios")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdGimnasio: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/gimnasios/:id", function () {
  it("respond with json containing a single gimnasios", async function () {
    const res = await request(app)
      .get("/api/gimnasios/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdGimnasio: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

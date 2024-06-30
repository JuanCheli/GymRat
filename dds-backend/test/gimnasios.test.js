const request = require("supertest");
const app = require("../index");

const gimnasioAlta = {
  Nombre: "Gimnasio " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaAlta: new Date().toISOString(),
};

const gimnasioModificacion = {
  Nombre: "Maquina " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  IdGimnasio: 4,
  FechaAlta: new Date().toISOString(),
  Eliminado: false
};

// test route/gimnasios GET
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

// test route/gimnasios/:id GET
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


// test route/maquinas POST
describe("POST /api/gimnasios", () => {
  it("Deberia devolver el gimnasio que acabo de crear", async () => {
    const res = await request(app).post("/api/gimnasios").send(gimnasioAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaAlta: expect.any(String)
      })
    );
  });
});

// test route/maquinas/:id PUT
describe("PUT /api/gimnasios/:id", () => {
  it("Deberia devolver el gimnasio con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/gimnasios/1")
      .send(gimnasioModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/maquinas/:id DELETE
describe("DELETE /api/gimnasios/:id", () => {
  it("Debería devolver el gimnasio con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/gimnasios/1");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     Idmaquina: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});

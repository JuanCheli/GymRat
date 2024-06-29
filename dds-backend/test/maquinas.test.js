const request = require("supertest");
const app = require("../index");
const maquinaAlta = {
  Nombre: "Maquina " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  IdGimnasio: 1,
  IdProveedor: 2,
  FechaCreacion: new Date().toISOString(),
};

const maquinaModificacion = {
  Nombre: "Maquina " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  IdGimnasio: 4,
  IdProveedor: 2,
  FechaCreacion: new Date().toISOString(),
};

// test route/maquinas GET
describe("GET /api/maquinas", () => {
  it("Deberia devolver todas las maquinas paginadas", async () => {
    const res = await request(app).get("/api/maquinas?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdMaquina: expect.any(Number),
            Nombre: expect.any(String),
            FechaCreacion: expect.any(String),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/maquinas GET
describe("GET /api/maquinas con filtros", () => {
  it("Deberia devolver las maquinas según filtro ", async () => {
    const res = await request(app).get("/api/maquinas/filtro/?Nombre=Pecho&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Pecho") || !array[i].ConStock ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/maquinas/:id GET
describe("GET /api/maquinas/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/maquinas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdMaquina: expect.any(Number),
        Nombre: expect.any(String),
        IdGimnasio: expect.any(Number),
        IdProveedor: expect.any(Number),
        FechaCreacion: expect.any(String),
        ConStock: expect.any(Boolean)
      })
    );
  });
});

// test route/maquinas POST
describe("POST /api/maquinas", () => {
  it("Deberia devolver la maquina que acabo de crear", async () => {
    const res = await request(app).post("/api/maquinas").send(maquinaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        IdGimnasio: expect.any(Number),
        IdProveedor: expect.any(Number),
        FechaCreacion: expect.any(String)
      })
    );
  });
});

// test route/maquinas/:id PUT
describe("PUT /api/maquinas/:id", () => {
  it("Deberia devolver la maquina con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/maquinas/1")
      .send(maquinaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/maquinas/:id DELETE
describe("DELETE /api/maquinas/:id", () => {
  it("Debería devolver la maquina con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/maquinas/1");
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

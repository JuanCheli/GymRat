const request = require("supertest");
const app = require("../index");

const inscriptosAlta = {
    Nombre: "Nombre " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    IdGimnasio: 1,
    FechaInscripcion: new Date().toISOString(),
};

const inscriptosModificacion = {
    Nombre: "Nombre " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    IdGimnasio: 1,
    idInscripto: 2,
    FechaInscripcion: new Date().toISOString(),
};

// test route/inscriptos GET
describe("GET /api/inscriptos", function () {
    it("Devolveria todos los inscriptos", async function () {
        const res = await request(app)
            .get("/api/inscriptos")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdInscripto: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaInscripcion: expect.any(String),
                    IdGimnasio: expect.any(Number),
                }),
            ])
        );
    });
});

// test route/inscriptos/:id GET
describe("GET /api/inscriptos/:id", function () {
    it("Devolveria el inscripto con el id 1", async function () {
        const res = await request(app)
            .get("/api/inscriptos/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdInscripto: 1,
                Nombre: expect.any(String),
                FechaInscripcion: expect.any(String),
                IdGimnasio: expect.any(Number),
            })
        );
    });
});


// test route/inscriptos POST
describe("POST /api/inscriptos", () => {
    it("Deberia devolver el inscripto que acabo de crear", async () => {
        const res = await request(app).post("/api/inscriptos").send(inscriptosAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Nombre: expect.any(String),
                IdGimnasio: expect.any(Number),
                FechaInscripcion: expect.any(String)
            })
        );
    });
});

// test route/inscriptos/:id PUT
describe("PUT /api/inscriptos/:id", () => {
    it("Deberia devolver el inscripto con el id 1 modificado", async () => {
        const res = await request(app)
            .put("/api/inscriptos/1")
            .send(inscriptosModificacion);
        expect(res.statusCode).toEqual(204);
    });
});

// test route/inscriptos/:id DELETE
describe("DELETE /api/inscriptos/:id", () => {
    it("Debería devolver el inscripto con el id 1 borrado", async () => {
        const res = await request(app).delete("/api/inscriptos/1");
        expect(res.statusCode).toEqual(200);

        // baja lógica, no se borra realmente
    });
});



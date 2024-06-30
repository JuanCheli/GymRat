const request = require("supertest");
const app = require("../index");

const proveedoresAlta = {
    Nombre: "Proveedor " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    Pais: "Pais" + (() => (Math.random() + 1).toString(36).substring(2))(),
    Telefono: "Telefono" + (() => (Math.random() + 1).toString(36).substring(2))(),
    FechaAltaEmpresa: new Date().toISOString(),
};

const proveedoresModificacion = {
    Nombre: "Proveedor " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    Pais: "Pais" + (() => (Math.random() + 1).toString(36).substring(2))(),
    Telefono: "Telefono" + (() => (Math.random() + 1).toString(36).substring(2))(),
    FechaAltaEmpresa: new Date().toISOString(),
    Eliminado: false,
    IdProveedor: 2
};

// test route/proveedores GET
describe("GET /api/proveedores", function () {
    it("Devolveria todos los proveedores", async function () {
        const res = await request(app)
            .get("/api/proveedores")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdProveedor: expect.any(Number),
                    Nombre: expect.any(String),
                    Pais: expect.any(String),
                    Telefono: expect.any(String),
                    FechaAltaEmpresa: expect.any(String)
                }),
            ])
        );
    });
});

// test route/proveedores/:id GET
describe("GET /api/proveedores/:id", function () {
    it("Deberia devolver el proveedor con el id 1", async function () {
        const res = await request(app)
            .get("/api/proveedores/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdProveedor: 1,
                Nombre: expect.any(String),
                Pais: expect.any(String),
                Telefono: expect.any(String),
                FechaAltaEmpresa: expect.any(String)
            })
        );
    });
});


// test route/proveedores POST
describe("POST /api/proveedores", () => {
    it("Deberia devolver el proveedor que acabo de crear", async () => {
        const res = await request(app).post("/api/proveedores").send(proveedoresAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Nombre: expect.any(String),
                Pais: expect.any(String),
                Telefono: expect.any(String),
                FechaAltaEmpresa: expect.any(String)
            })
        );
    });
});

// test route/proveedores/:id PUT
describe("PUT /api/proveedores/:id", () => {
    it("Deberia devolver el proveedor con el id 1 modificado", async () => {
        const res = await request(app)
            .put("/api/proveedores/1")
            .send(proveedoresModificacion);
        expect(res.statusCode).toEqual(204);
    });
});

// test route/proveedores/:id DELETE
describe("DELETE /api/proveedores/:id", () => {
    it("Debería devolver el proveedor con el id 1 borrado", async () => {
        const res = await request(app).delete("/api/proveedores/1");
        expect(res.statusCode).toEqual(200);

        // baja lógica, no se borra realmente
    });
});



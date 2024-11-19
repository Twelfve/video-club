const supertest = require("supertest");
const app = require("../app");

describe("Probar el sistema de autenticacion", () => {
    it("Deberia de obtener un login con user y password correctos", (done) => {
        supertest(app).post("/login")
            .send({ email: "a359733@uach.mx", password: "password" })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    })
});
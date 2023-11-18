
const request = require("supertest");
const app = require("../server.js");

describe("POST /api/contest/:id_c/tag", () => {
    it("Cadastra uma nova tag associada à competição dada pelo id_c", async () => {
        const res = await request(app).post("/api/contest/3/tag").send({
            tagId: 677,
            name: "teste tag creation",
            value: "some value",
            entityId: "333",
            entityType: "site",
            contestId: 3
        });
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/contest/:id_c/tag", () => {
    it("Lista as tags associadas à competição dada pelo id_c", async () => {
        const res = await request(app).get("/api/contest/3/tag");
        const queryResponse = res.body.entityTag[0];

        expect(queryResponse.entityId).toBe('333');
        expect(queryResponse.tag[0].id).toBe(677);
        expect(queryResponse.tag[0].name).toBe("teste tag creation");
        expect(queryResponse.tag[0].value).toBe("some value");

        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/contest/:id_c/tag/:id_t", () => {
    it("Mostra a tag dada pelo id_t no contest id_c", async () => {
        const res = await request(app).get("/api/contest/3/tag/677");
        const queryResponse = res.body.entityTag[0];

        expect(queryResponse.entityId).toBe('333');
        expect(queryResponse.tag[0].id).toBe(677);
        expect(queryResponse.tag[0].name).toBe("teste tag creation");
        expect(queryResponse.tag[0].value).toBe("some value");

        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /api/contest/:id_c/tag", () => {
    it("Atualiza a tag dada pelo id_t no contest id_c", async () => {
        const res = await request(app).put("/api/contest/3/tag/677").send({
            name: "teste tag creation[UPDATED]",
            value: "some value[UPDATED]",
        });

        //Verificar se a tag foi atualizada

        const tag = await request(app).get("/api/contest/3/tag/677");
        const queryResponse = tag.body.entityTag[0];

        expect(queryResponse.tag[0].id).toBe(677);
        expect(queryResponse.tag[0].name).toBe("teste tag creation[UPDATED]");
        expect(queryResponse.tag[0].value).toBe("some value[UPDATED]");

        expect(res.body.message).toBe("Sucess: tag(s) atualizada(s).");
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/contest/:id_c/tag/:id_t", () => {
    it("Remove a tag dada pelo id_t no contest id_c", async () => {
        const res = await request(app).delete("/api/contest/3/tag/677");
        
        expect(res.body.message).toBe("Sucess: tag(s) excluída(s).");
        expect(res.statusCode).toBe(200);
    });
});
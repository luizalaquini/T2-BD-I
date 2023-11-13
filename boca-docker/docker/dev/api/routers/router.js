const express = require("express");
const routes = express.Router();

const contestTags = require("../controllers/method.js");
const tags = new contestTags();

// get
routes.get("/api/contest/:id_c/tag", tags.show);
routes.get("/api/contest/:id_c/tag/:id_t", tags.show);

// post
routes.post("/api/contest/:id_c/tag", tags.store);
routes.post("/api/contest/:id_c/tag/:id_t", tags.store);

// put
routes.put("/api/contest/:id_c/tag/:id_t", tags.update);

// delete
routes.delete("/api/contest/:id_c/tag/:id_t", tags.delete);

module.exports = routes;

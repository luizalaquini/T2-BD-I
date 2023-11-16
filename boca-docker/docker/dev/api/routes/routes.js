const express = require("express");
const routes = express.Router();

const CRUD_tags = require("../controllers/method.js");
const tags = new CRUD_tags();

// rotas
/*
<webservice>/api/contest/:id_c/tag GET Lista as tags associadas à competição dada pelo id_c
<webservice>/api/contest/:id_c/tag POST Cadastra uma nova tag associada à competição dada pelo id_c
<webservice>/api/contest/:id_c/tag/:id_t GET Mostra a tag dada pelo id_t no contest id_c
<webservice>/api/contest/:id_c/tag/:id_t PUT Atualiza a tag dada pelo id_t no contest id_c
<webservice>/api/contest/:id_c/tag/:id_t DELETE Remove a tag dada pelo id_t no contest id_c
*/


/* GET 
<webservice>/api/contest/{id_c}/tags
<webservice>/api/contest/{id_c}/tag/{id_t}
*/

routes.get("/api/contest/:id_c/tag", tags.read_tags);
routes.get("/api/contest/:id_c/tag/:id_t", tags.read_tags);


/* POST
<webservice>/api/contest/{id_c}/tag
*/
routes.post("/api/contest/:id_c/tag/:id_t", tags.create_tags);


/* PUT
<webservice>/api/contest/{id_c}/tag/{d_t}
*/
routes.put("/api/contest/:id_c/tag/:id_t", tags.update_tags);


/* DELETE
<webservice>/api/contest/{id_c}/tag/{d_t}
 */
routes.delete("/api/contest/:id_c/tag/:id_t", tags.delete_tags);


module.exports = routes;



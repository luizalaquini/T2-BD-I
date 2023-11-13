const db = require("../database/connection");
const { handleError } = require("../utils/resultHandler");

module.exports = {
  index(req, res) {
    db.query("SELECT * FROM contesttable", (err, queryResult) => {
      if (err) {
        return handleError(err, res);
      }
      return res.json(queryResult.rows);
    });
  },

  // GET
  show(req, res) {
    const { id_c, id_t } = req.params;

    // Verifique se id_t está presente para obter uma tag específica
    if (id_t) {
      db.query("SELECT * FROM contest_tags WHERE contest_id = $1 AND tag_id = $2", [id_c, id_t], (err, queryResult) => {
        if (err) {
          return handleError(err, res);
        }
        return res.json(queryResult.rows);
      });
    } else {
      // Caso contrário, obtenha todas as tags para a competição id_c
      db.query("SELECT * FROM contest_tags WHERE contest_id = $1", [id_c], (err, queryResult) => {
        if (err) {
          return handleError(err, res);
        }
        return res.json(queryResult.rows);
      });
    }
  },

  // PUT
  update(req, res) {
    const { id_c, id_t } = req.params;
    const { name, value } = req.body;

    db.query("UPDATE contest_tags SET name = $1, value = $2 WHERE contest_id = $3 AND tag_id = $4",
      [name, value, id_c, id_t], (err, queryResult) => {
        if (err) {
          return handleError(err, res);
        }
        return res.json({ message: "Tag atualizada com sucesso!" });
      });
  },

  // DELETE
  delete(req, res) {
    const { id_c, id_t } = req.params;

    db.query("DELETE FROM contest_tags WHERE contest_id = $1 AND tag_id = $2", [id_c, id_t], (err, queryResult) => {
      if (err) {
        return handleError(err, res);
      }
      return res.json({ message: "Tag removida com sucesso!" });
    });
  },
};

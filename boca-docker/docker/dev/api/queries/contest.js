const db = require("../database/config");

class contest{

  //recupera toda a tabela
  async findContestTable_ALL() {
    return await db.query('SELECT * FROM "contesttable";');
  }

  //recupera apenas uma linha da tabela com id especificado
  async findContestTable_ID(id_c) {
    return await db.query(`SELECT * FROM "contesttable" WHERE "contestnumber" = ${id_c};`);
  }

}

module.exports = new 	contest();
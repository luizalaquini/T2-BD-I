//obtendo as configurações de login
const db = require('./config');

module.exports = {

  //obtendo conexão com o servidor
  connectDatabase: function() {
    return new Promise((server_on) => {
      db.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
        } else {
          console.log("Database connected!");
          server_on();
        }
      });
    });
  },

  //execultando alguma query
  executeQueryDatabase: async function(query, name = "") {
    try {
      const result_query = await db.query(query);
      console.log(`Query ${name} executed successfully`);
      return result_query;
    } catch (error) {
      console.log("Error executing query: " + error);
      throw error;
    }
  }
};
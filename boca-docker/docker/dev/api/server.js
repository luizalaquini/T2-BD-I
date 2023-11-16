
const express = require('express');
const { connectDatabase, executeQueryDatabase } = require('./database/connection.js');
const {createTable_TAG } = require('./queries/createTable.js');
const routes = require('./routes/routes.js');

//Gerar documentação automática
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./document/swagger.json'); // Arquivo Swagger gerado

async function startAPI() {
  // Constantes
  const PORT = 3000;
  const HOST = '0.0.0.0';

  // App de requisição
  const app = express(); //Criando o aplicativo Express
  //app.get('/', (req, res) => {
 // res.send('Deu certo yupi');
//});

   app.use(express.json())  //Configurando o middleware para análise de JSON
   app.use(routes)          //Configurando o middleware para as rotas
  // app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  // Connect to database
  await connectDatabase();

  // Create table Tag
  try {
    await executeQueryDatabase(createTable_TAG, "Tag");
    console.log("Tag table created successfully")
  } catch (error) {
    console.error("Error creating Tag table: " + error);
  }
}

startAPI();
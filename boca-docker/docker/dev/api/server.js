

//começando kk

const express = require('express');
const { connectDb, executeQueryDb } = require('./database/connection.js');
const {createTableDb } = require('./database/createTable.js');
const routes = require('./routes/routes.js');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./docs/swagger.json'); // Arquivo Swagger gerado

async function startServer() {
  // Constants
  const PORT = 3000;
  const HOST = '0.0.0.0';

  // App
  const app = express();
  app.use(express.json())
  app.use(routes)
  // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  // Connect to database
  await connectDb();

  // Create table Tag
  try {
    await executeQueryDb(createTableDb, "Tag");
    console.log("Tag table created successfully")
  } catch (error) {
    console.error("Error creating Tag table: " + error);
  }
}

startServer();
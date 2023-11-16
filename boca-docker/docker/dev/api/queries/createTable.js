// SQL command to create the "Tag" table
const createTable_TAG = `
DROP TABLE IF EXISTS "tagtable" CASCADE;
CREATE TABLE "tagtable" (
    "tagid" serial PRIMARY KEY,
    "name" varchar(50),
    "value" varchar(50),
    "entityid" varchar(50),
    "entitytype" varchar(50),
    "contestid" integer
);
`;

module.exports = { createTable_TAG };
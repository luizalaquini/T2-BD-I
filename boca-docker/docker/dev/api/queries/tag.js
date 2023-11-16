const db = require("../database/config");

class Tag {

    async createTagElement(params) {
        return await db.query(`
            INSERT INTO tagtable (tagid,name,value,entityid,entitytype,contestid)
            VALUES ($1, $2, $3, $4, $5, $6)
            `, params);
    }

    async findTagTable_All() {
        return await db.query('SELECT * FROM "tagtable";');
    }

    async updateTagTable(name, value, entity_type, entity_id, id) {
        const query = `
        UPDATE tagtable
        SET name = $1, value = $2
        WHERE entitytype = $3 AND entityid = $4 AND tagid = $5
      `;
    
        const values = [name, value, entity_type, entity_id, id];
    
        return await db.query(query, values);
      }

    async getEntitype(entityType, entityId, tagId, tagName, tagValue) {
        let query = 'SELECT * FROM tagtable WHERE entitytype = $1 AND entityid = $2';
        let params = [entityType, entityId];
        let count = 2;

        // Verifica se possui o parâmetro tagId 
        if (tagId) {
            count++;
            query += ' AND tagid = $' + count;
            params.push(tagId);
        }

        // Verifica se possui o parâmetro tagName
        if (tagName) {
            count++;
            query += ' AND name = $' + count;
            params.push(tagName);
        }

        // Verifica se o possui o parâmetro tagValue
        if (tagValue) {
            count++;
            query += ' AND value = $' + count;
            params.push(tagValue);
        }

        const get_result = await db.query(query, params);
        return get_result.rows;
    }



    async deleteTagElement(params) {
        return await db.query(`
        DELETE FROM tagtable WHERE tagid = $1 AND entityid = $2 AND entitytype = $3 AND contestid = $4
        `, params);
    }

}

module.exports = new Tag();

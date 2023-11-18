
//const de validação
//const { handleError } = require("../utils/handleError.js");


//const para a manipulação entre rotas
const contest = require("../queries/contest.js");
const tag = require("../queries/tag.js");
const {entity, arrayEntityTypes} = require("../queries/entitypes.js");
const tagSchema = require("../schemas/tagSchema.js");

function createTag(params) {
  return {
    tagId: params.tagId,
    name: params.name,
    value: params.value,
    entityId: params.entityId,
    entityType: params.entityType,
    contestId: params.contestId
  }
}

module.exports = class CRUD_tags {

  //*criação de tags
  async create_tags(req, res) {
    try {
      const { id_c } = req.params;
      const body = req.body;

      if(!id_c) return res.json({ error: "Usuário não fornceu ID" }).status(400);
      
      const tagObj = {
        tagId: body.tagId,
        name: body.name,
        value: body.value,
        entityId: body.entityId,
        entityType: body.entityType,
        contestId: id_c
      }
      
      tagSchema.validateSync(tagObj);

      if(!arrayEntityTypes.includes(tagObj.entityType))
        return res.json({ error: "EntittyType inválido. Valores válido: 'site', 'site/user', 'problem', 'language'" }).status(400);

      const findId = await contest.findContestTable_ID(id_c);

      const c_id = findId.rows[0];

      //se o Id da competição não for encontrado
      if (c_id === null) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' });
      }

      const entityTag = createTag(tagObj);

      await tag.createTagElement(entityTag);

      return res.json({ message: "Sucess: tag criada." })
    }
    catch (error) {
      console.error(error);
      return res.json(error);
    }
  }

  //* leitura de tags
  async read_tags(req, res) {
    try {
      let { id_c } = req.params;

      if(!id_c) return res.json({ error: "Usuário não fornceu ID" }).status(400);

      // Verificar se o contest existe
      const findId = await contest.findContestTable_ID(id_c);
      const contestnumber = findId.rows[0];

      if (!contestnumber) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' }).status(404);
      }

      const tags = await tag.finTagsByContestId(id_c);

      if(tags.rowCount === 0) return res.json({ error: "Nenhuma tag encontrada" }).status(404);

      const entityTag = {
        entityTag: [
          {
            entityType: tags.rows[0].entitytype,
            entityId: tags.rows[0].entityid,
            tag: tags.rows.map(tag => {
              return {
                id: tag.tagid,
                name: tag.name,
                value: tag.value
              }
            })
          }
        ]
      }

      return res.json(entityTag).status(200);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  }

  //* leitura de tags em uma competição
  //ATENÇÃO: Apenas uma tag é retornada. E quando o contest não tem tags, retorna uma mensagem de erro
  //mas poderia retornar sem msg de erro e array vazio no lugar das tags. Foi apenas um decisão de design
  async read_tag_in_contest(req, res) {
    try {
      let { id_c, id_t } = req.params;

      if(!id_c || !id_t) return res.json({ error: "Usuário não fornceu ID" }).status(400);

      // Verificar se o contest existe
      const findId = await contest.findContestTable_ID(id_c);
      const contestnumber = findId.rows[0];

      if (!contestnumber) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' }).status(404);
      }

      const tags = await tag.finTagsByContestId(id_c);

      if(tags.rowCount === 0) return res.json({ error: "Nenhuma tag encontrada" }).status(404);

      const entityTag = {
        entityTag: [
          {
            entityType: tags.rows[0].entitytype,
            entityId: tags.rows[0].entityid,
            tag: tags.rows.filter(tag => tag.tagid == id_t)
          }
        ]
      }

      return res.json(entityTag).status(200);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  }

  //*atualização de tags
  async update_tags(req, res) {
    try {

      const contestId = req.params.id_c;
      const tagId = req.params.id_t;

      if (contestId === null) {
        return res.json({ error: 'Erro: Id da competição inserido é nulo!' });
      }
      if(tagId === null) {
        return res.json({ error: 'Erro: Id da tag inserido é nulo!' });
      }

      const findId = await contest.findContestTable_ID(contestId);
      const c_id = findId.rows[0];

      if (c_id === null) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' });
      }

      const tagsInContest = await tag.finTagsByContestId(contestId);
      if(tagsInContest.rowCount === 0) return res.json({ error: "Nenhuma tag encontrada" }).status(404);

      const tagToUpdate = tagsInContest.rows.filter(tag => tag.tagid == tagId);
      if(tagToUpdate.length === 0) return res.json({ error: "Nenhuma tag encontrada" }).status(404);

      const { name, value } = req.body;

      if(!name || !value) return res.json({ error: "Nome ou valor não fornecido" }).status(400);

      await tag.updateTagTable(name, value, tagToUpdate[0].entitytype, tagToUpdate[0].entityid, tagToUpdate[0].tagid);

      return res.json({ message: "Sucess: tag(s) atualizada(s)." });
    } catch (error) {
      console.error(error);
      return res.json(error)
    }
  }

  //*remoção de tags
  async delete_tags(req, res) {
    try {

      const contestId = req.params.id_c;
      const id_t = req.params.id_t;

      if (contestId === null) {
        return res.json({ error: 'Erro: Id da competição inserido é nulo!' });
      }

      const tagsInContest = await tag.finTagsByContestId(contestId);
      const tagTarget = tagsInContest.rows.filter(tag => tag.tagid == id_t);

      if(tagTarget.length === 0) return res.json({ error: "Nenhuma tag encontrada" }).status(404);

      await tag.deleteTagElement(id_t, tagTarget[0].entityid, tagTarget[0].entitytype, contestId);

      return res.json({ message: "Sucess: tag(s) excluída(s)." })
    }
    catch (error) {
      console.error(error);
      return res.json(error); 
    }

  }

 };



//const de validação
//const { handleError } = require("../utils/handleError.js");


//const para a manipulação entre rotas
const contest = require("../queries/contest.js");
const tag = require("../queries/tag.js");
const {entity} = require("../queries/entitypes.js");

module.exports = class CRUD_tags {


  //criação de tags
  async create_tags(req, res) {
    try {
      const { contestId } = req.params;
      const { tagTable } = req.body; 

      //se não passar o ID da compedição
      if (contestId == null) {
        return res.json({ error: 'Erro: Id da competição inserido é nulo!' });
      }

      const findId = await contest.findContestTable_ID(contestId);
      const c_id = findId.rows[0];

      //se o Id da competição não for encontrado
      if (c_id == null) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' });
      }

      for (const element of tagTable) {
        const { entityType,entityId, entityName } = element;

        if (!entityId || !entityType || !entityName) {
          return res.json({ error: 'Erro: Id, Tipo ou Nome é inválido ' });
        }

        // Verifica se o tipo da entidade é válido
        if (!entity(entityType)) {
          return res.json({ error: `Erro: O tipo da entidade é inválido` });
        }

        // Insersão de tags
        for (const ele of tag) {
          const { id, name, value } = ele;

          const values = [id, name, value, entityId, entityType, contestId];
          await Tag.createTagElement(values);
        }
      }

      res.json({ message: "Sucess: tag(s) criada(s)." })
    }
    catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  //leitura de tags
  async read_tags(req, res) {
    try {
      let { contestId, entityType, entityId } = req.params;
      const { tagId, tagName, tagValue } = req.query;

      if (!entityType) {
        entityType = "site/user"
        entityId = `${req.params.siteId}/${req.params.userId}` //id do site/ id do usuário
      }
      // Verificar se os parâmetros obrigatórios estão presentes
      if (!contestId || !entityType || !entityId) {
        return res.json({ error: 'Erro: Id contest, Tipo ou Nome da entidade é inválida' });
      }

      // Verificar se o contest existe
      const findId = await contest.findContestTable_ID(contestId);
      const id_c = findId.rows[0];
      if (!id_c) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' });
      }

      // Obter as tags da entidade
      const entityTags = await Tag.getEntitype(entityType, entityId, tagId, tagName, tagValue);
      // Formatar a resposta
      const result = {
        entityType,
        entityTag: entityTags.map(tag => ({
          entityId,
          tag: {
            id: tag.id,
            name: tag.name,
            value: tag.value
          }
        }))
      };

      res.json(result);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  //atualização de tags
  async update_tags(req, res) {
    try {
      const { contestId } = req.params;
      const { tagTable } = req.body; 

      if (contestId == null) {
        return res.json({ error: 'Erro: Id da competição inserido é nulo!' });
      }

      const findId = await contest.findContestTable_ID(contestId);
      const c_id = findId.rows[0];

      if (c_id == null) {
        return res.json({ error: 'Erro: Id da competição não foi encontrado!' });
      }

      for (const element of tagTable) {
        const { entityType,entityId, entityName } = element;

        if (!entityId || !entityType || !entityName) {
          return res.json({ error: 'Erro: Id, Tipo ou Nome é inválido ' });
        }

        // Verifica se o tipo da entidade é válido
        if (!entity(entityType)) {
          return res.json({ error: `Erro: O tipo da entidade é inválido` });
        }


        // Insere as novas tags para a entidade
        for (const ele of tag) {
          const { id, name, value } = ele;
          await Tag.updateTagTable(name, value, entityType, entityId, id);
        }
      }

      res.json({ message: "Sucess: tag(s) atualizada(s)." });
    } catch (error) {
      console.error(error);
      res.json(error)
    }
  }

  //remoção de tags
  async delete_tags(req, res) {
    try {
      const { contestId } = req.params;
      const { tagTable } = req.body; 

      if (contestId == null) {
        return res.json({ error: 'Erro: Id da competição inserido é nulo!' });
      }

      for (const element of tagTable) {
        const { entityType,entityId, entityName } = element;

        if (!entityId || !entityType || !entityName) {
          return res.json({ error: 'Erro: Id, Tipo ou Nome é inválido ' });
        }

        // Verifica se o tipo da entidade é válido
        if (!entity(entityType)) {
          return res.json({ error: `Erro: O tipo da entidade é inválido` });
        }

        // deleta as tags para cada entidade
        for (const ele of tag) {
          const { id, name, value } = ele;

          const values = [id, entityId, entityType, contestId];
          await Tag.deleteTagElement(values);
        }
      }

      res.json({ message: "Sucess: tag(s) excluída(s)." })
    }
    catch (error) {
      console.error(error);
      res.json(error); 
    }

  }

 };

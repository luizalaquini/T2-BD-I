const { object, string, number, date } = require('yup');

  let tagSchema = object({
    tagId: number().required().positive().integer(),
    name: string().required(),
    value: string().required(),
    entityId: number().required().positive().integer(),
    entityType: string().required(), //Verificar em código se o tipo passado é válido
    contestId: number().required().positive().integer()
  })


  module.exports = tagSchema;
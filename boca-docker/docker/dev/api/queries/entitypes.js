
//tipos de entidade / tableas 
const site = 'site';
const siteUser = 'site/user';
const problem = 'problem';
const language = 'language';

//array de entidades
const entityTypes = {
    site,
    siteUser,
    problem,
    language
    
};

//validação de entidade
function entity(e_t) {
  const isValid = Object.values(entityTypes);
  return isValid.includes(e_t);
}


module.exports = { problem, language, site, siteUser, entity }


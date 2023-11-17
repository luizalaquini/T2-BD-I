# UFES20232BDCOMP

# 🔎 Especifícação do Trabalho


<div  Align="justify">
<div Align="center"><img src="./boca-docker/files/images/img1.jpg" width=80%> </div>


<br/>
O objetivo do trabalho é poder criar e gerenciar tags para entidades do BOCA. Uma tag é uma espécie de rótulo que
pode ser atribuído a qualquer entidade. É um par de uma chave e um valor opcional que permite categorizar os recursos,
o que facilita a pesquisa. Por exemplo, aplicando uma tag chamada domain com o valor basic select em problemas de
interesse, um professor e/ou aluno podem obter uma lista de todos os exercícios de consultas básicas usando a API
REST.

</div>
<br/>
<br/>
<br/>

# 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Hardware

  * Para o Docker Desktop:
    * Recomendado possuir processador Dual Core
    * Recomendado possuir 8GB de Ram (a instalação toma por volta de 2GB de disco)
  


- Software
  * Ter o Docker instalado na máquina, seja nativo ou o Docker Desktop
  * Ter postman instalado na máquina (ou um software parecido).
  * Ter o Node / npm instalado na máquina

<br/>


# 📁 Estrutura de Arquivos

Aqui podemos ver como os arquivos são estruturados no projeto em sua forma reduzida (ignorando os arquivos clonados anteriormente)


```
Root
│   docker-compose.api.yml
│   docker-compose.dev.yml
│   docker-compose.prod.yml
└── docker
    │     
    └─── dev
       │
       └─── api
            │
            └─── server.ts  - Aplicação principal  
            └─── controller - Onde estão os métodos de controle (CRUD).
            └─── database   - Onde estão as migrations e a definição do banco.
            └─── queries    - Onde estãos as queries/ comandos em SQL.
            └─── routes     - Rotas da aplicação
      
```
<br/>
<br/>
<br/>

# 👨‍💻 Executar a aplicação

Eu deixarei o projeto do João Fazolo  `boca-docker` clonado em meu projeto.

Dentro do diretório `./boca-docker` e do diretório `./boca-docker/docker/dev/api` é necessário baixar as dependências do node_modules

```bash
# Instalar as depedências
npm install 
```
ou
```bash
# Instalar as depedências
yarn install
```
Com a dependência baixada, basta utilizar os seguintes comandos:

```bash
# Buildar e Execultar os containers Docker
docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.api.yml up -d
docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.api.yml up -d --build
```
A porta a qual a aplicação foi atribuida é a `localhost:49160`.

<br/>
<br/>
<br/>



# ⚡ Métodos

Requisições para a API devem seguir os padrões:

<div style="display: inline_block" align="center">


| Endpoint | Método | Funcionalidade |
| :---:                                       |     :---: |          :---:                                       |
| <:webservice>/api/contest/:id_c/tag         | `GET`     | Lista as tags associadas à competição dada pelo id_c |
| <:webservice>/api/contest/:id_c/tag         | `POST`    | Cadastra uma nova tag associada à competição dada pelo id_t |
| <:webservice>/api/contest/:id_c/tag/:id_t   | `GET`     | Mostra a tag dada pelo id_t no contest id_c          |
| <:webservice>/api/contest/:id_c/tag/:id_t   | `PUT`     | Atualiza a tag dada pelo id_t no contest id_c        |
| <:webservice>/api/contest/:id_c/tag/:id_t   | `DELETE`           | Remove a tag dada pelo id_t no contest id_c      |
<div style="display: inline_block" align="left">

<br/>
<br/>

# 🚀 Rotas

A aplicação possui as determinadas rotas:

```js
/* GET */

localhost:49160/rota?
```

```js
/* POST */

localhost:49160/rota?
```
```js
/* GET */

localhost:49160/rota?
```
```js
/*PUT */

localhost:49160/rota?
```
```js
/*DELETE */

localhost:49160/rota?
```

<br/>
<br/>
<br/>





# 📚 Testes com a Aplicação

[~~~~~~ ADICIONAR  XPICAÇÃO DE TESTES~~~~~~]


<br/>

### Respostas das requisições

<div style="display: inline_block" align="center">

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Requisição executada com sucesso (success).|
| `401` | Dados de acesso inválidos.|
| `500` | Falha na execução.|
<div style="display: inline_block" align="left">



<br/>
<br/>
<br/>

# 🤝 Desenvolvedores

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/DsBrito" width="150px;" alt="Foto do Dionatas Santos Brito no GitHub"/><br>
        <sub>
          <b style="color: orange">Dionatas Brito</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/LuizaLaquini" width="150px;" alt="Foto do Rogério Medeiros"/><br>
        <sub>
          <b style="color: orange">Luiza Laquini</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


<br/>

# 📝 Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.

<br/>

[⬆ Voltar ao topo](#UFES20232BDCOMP)<br>
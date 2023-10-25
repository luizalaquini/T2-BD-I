# UFES20232BDCOMP

### Premissa: Ter o docker instalado na máquina
### 1° etapa - Executar os Containers

-   Do passo 1: 

    - Build your Docker image: `docker build . -t <your username>/boca-api`

-   Do passo 2: 
    - Change the work directory to `./boca-docker` and run: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
            
    - To stop the application: `docker compose -f docker-compose.yml -f docker-compose.prod.yml down`
    - Cleanup: list the existing volumes (`docker volume ls`) and remove them all (`docker volume rm $(docker volume ls -q)`);

    - Run the command to launch the application: `docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.api.yml up -d --build`

    - Using the web browser visit http://localhost:8000/boca and log in (user: admin | password: boca). 
        
    - In order to access the database, visit http:// :8080 and log in with the credentials below:

        -    System: PostgreSQL
        -    Server: boca-db
        -    Username: postgres
        -    Password: superpass

    


# Administração de Serviços e Aplicações Informáticas (ASAI)
Repositório para disciplina Administração de Serviços e Aplicações Informáticas - IPB

Professor: Sandro Renato Dias

## Where do I put my code?
There are two main folders: frontend and backend.

### For frontend files
Inside the **frontend/src** folder we have two more folders named: **CRM** and **ERP**, inside them you find folders with the name of the modules that must be developed. Feel free to create, update and delete files/folders inside your group's folder, but don't change files that are outside your group's folder! (ofc, package json can be modified)

### For backend files
To create an route in backend, you need to create a new route file inside the folder **/backend/src/app/routes and associate the created file in the respective router (ERP or CRM) **/backend/src/app/routes/erpRouter.js or **/backend/src/app/routes/crmRouter.js, and to add the programming logic of application you create a controller file inside the folder **/backend/src/app/controllers.

If you have any trouble check the example with the files worldRouter.js and wordController.js, that show how to create a route and to make simple CRUD operations with sequelize using the model World.js.

To execute the backend download the code, execute the command "npm i" inside the folder **/backend to download all depencies, and then "npm run dev" to deploy the application.

Check if you are using the corrects credentials in the file **/backend/src/config/database.js to make a connection with database.

In the end, routes registered under the file erpRouter.js is gonna be acessed http request under /erp/** and for that are registered under crmRouter.js is gonna be /crm/**.

**DO NOT CHANGE ANY BACKEND FILES, WE'RE WAITING FOR THE FINAL VERSION OF THE DATABASE MODEL**


## How do I submit my code?
Every group **must** create a PULL REQUEST from a branch. (to create a branch you need to be a collaborator, send your github username to this e-mail: caionakai2015@gmail.com so that I can invite you)

In order to avoid conflicts, before creating the PR make sure your branch is up-to-date. To do that use the following commands:
```
1. git checkout master
2. git pull
3. git checkout -
4. git rebase master
```

## Api Structure

  * There must be atleast 5 routes for each entity - 
  
        - GET /{entity}             (Eg:- GET /users)
        
        - GET /{entity}/:id         (Eg:- GET /users/59e59057fd816d1af4f27b15)
        
        - POST /{entity}            (Eg:- POST /users)
        
        - PUT /{entity}/:id         (Eg:- PUT /users/59e59057fd816d1af4f27b15)
        
        - DELETE /{entity}/:id      (Eg:- DELETE /users/59e59057fd816d1af4f27b15)
        
      Note that here we have to use the plural.

   * Cases where another type of routes will be used - 

       - GET /{entity}/:name         (Eg:- GET /events/errata-18)

      To handle this, we have to make sure that our mongoose query has an OR operation which fetches either by name or by id.

   * As exposing the mongodb id for an entity to end users would be incorrect, we will use some other identifier.  

       Eg:- When details of particular event will be displayed, some identifier must be shown in the address bar (so that a user can share the event on social media). Here obviously we won't show the event mongo id, instead we will use the *slug* module to make a unique identifier for an event through the event's name.

   * However, it is still mandatory to make the route using mongo id also. This will help admin to debug the application consistently.



## Entities
  1. *User* - model
  2. *Society* - model 
  3. *Event* - model 
  4. *Arena* - model 
  5. *Question* - model
  6. *Media* - schema
  7. *Winner* - schema

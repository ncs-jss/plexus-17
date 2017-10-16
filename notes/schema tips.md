## Schema Designing Tips

Difference between model, schema and simple nesting.

1. If an entity doesn't have a common pattern, of limited numbers and it's always used along with another entity then we should nest the former inside the latter (which may be a model or a schema).

   Eg- **Event** entity and Rules entity. Here the rule won't necessary be in any format and it will always be used with an event. So there is no need to make a separate schema or model for it.
   **In short good for many-to-one and one-to-one relations where the former(like Rule) has no pattern.**

2. A schema is used when there is some common pattern in all instances of an entity and it's always used along with another entity.
   Such entity can be made a schema and then added to the latter entity(which can be a schema or model).

   Eg - **User** entity and **Job** entity. Here a job will always have a certain pattern (like joiningDate, description, position, location etc.) and that job will always belong to that user. Also a user will certainly not have more than 15 jobs.
   **In short good for many-to-one and one-to-one relations where the former(like Job) has some pattern.**

3. If two entities are often used separately but are still somehow associated and there are large numbers of both of them, then only we make
   models for each.
   
   Eg- User entity and Post entity. Here each will be used separately many times. Each user can have thousand of blogs and yet each blog must have some user. So both them should be designed as models.
   **In short good for many-to-many, many-to-one and one-to-one relations which doesn't fit the first two scenarios**


##Guidelines - 

   1. Whenever a field is associated with two models, prefix it with _ .
       
       Eg - As Society and User models are linked so in the User model, the society field is present as `_society`.

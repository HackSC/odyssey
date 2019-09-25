# Odyssey Server

## Sequelize Migrations 
We use Sequelize as a MySQL ORM. We can define models and perform database operations on such models through Sequelize. What's important to note is that Sequelize is a relational database that requires defined schemas, therefore editing a model requires making changes to the schema in the database. We can keep track of changes to schemas through database migrations (see more: https://sequelize.org/master/manual/migrations.html)

Please read through the Sequelize documentation for more on migrations

### Adding a Model
See this section on how to generate/create a model and a migration: https://sequelize.org/master/manual/migrations.html#creating-first-model--and-migration- 

### Changing a Model
When you change a model, you need to generate a migration. 

Generate a migration by running `npx sequelize-cli migration:generate --name=NAME_OF_MIGRATION`. Once you have a migration file, you'll need to define the `up` and `down` logic for your migration (see: https://sequelize.org/master/manual/migrations.html#migration-skeleton). This is where you define the logic for updating the schema and reverting changes to the schema.

For example: if you were adding a column to `User`, you would write logic to add a column to `User` for `up` then write logic to remove that column in the `down` method. 

In parallel to your migration code, you need to update your models definition in `src/models/YOUR_MODEL.js` so the right methods can be called on your model
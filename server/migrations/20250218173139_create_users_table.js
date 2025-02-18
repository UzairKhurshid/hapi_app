exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('avatar').nullable();
      table.enum('role', ['user', 'admin']).defaultTo('user');
      table.timestamps(true, true); // Adds created_at and updated_at timestamps
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  
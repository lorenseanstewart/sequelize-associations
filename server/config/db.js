'use strict'

const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
db.comments = require('../models/comments.js')(sequelize, Sequelize);
db.posts = require('../models/posts.js')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

module.exports = db;
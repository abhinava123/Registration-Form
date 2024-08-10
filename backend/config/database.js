// database.js
const { Sequelize } = require("sequelize");

// Database connection
const sequelize = new Sequelize("registration_form", "root", "Abhinavdubey@123", {
  host: "localhost",
  dialect: "mysql",
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

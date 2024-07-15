const mongoose = require("mongoose");

const connect = () => {
  const db_connection = process.env.DATABASE_URL;
  return mongoose.connect(db_connection);
};

module.exports = connect;

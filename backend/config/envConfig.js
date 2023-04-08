require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  USERID: process.env.USERID,
  PASS: process.env.PASS,
  MPORT: process.env.MPORT,
  HOST: process.env.HOST,
};

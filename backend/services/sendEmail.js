const nodemailer = require("nodemailer");
const config = require("../config/envConfig");

const sendEmail = async (options) => {
  console.log(config);
  var transporter = nodemailer.createTransport({
    host: config.HOST,
    port: config.MPORT,
    auth: {
      user: config.USERID,
      pass: config.PASS,
    },
  });
  transporter.sendMail(
    {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    },
    function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    }
  );
};

module.exports = sendEmail;

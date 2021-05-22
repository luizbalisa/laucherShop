const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "be819e06ac4af8",
    pass: "190f94c08a45c1",
  },
});

module.exports = transport
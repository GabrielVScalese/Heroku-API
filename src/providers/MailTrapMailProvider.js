const nodemailer = require("nodemailer");

class MailtrapMailProvider {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "204a7a0ed1237b",
        pass: "5bab52a8a82a5c",
      },
    });
  }

  async sendMail(message) {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

module.exports = MailtrapMailProvider;

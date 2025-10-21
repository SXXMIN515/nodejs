const nodemailer = require("nodemailer");

// nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tnals686@daum.net",
    pass: "poiafgyfwopqduqd",
  },
});

function mailSendFunc() {
  const data = {
    from: "tnals686@daum.net",
    to: "gda521@daum.net",
    subject: "subject",
    html: "Sample Content",
    attachments: [
      {
        filename: "customers.xlsx",
        path: "./files/customers.xlsx",
      },
    ],
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}
mailSendFunc();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@clujulmeu.com",
      pass: "TMLUDuaNm4Qg" // parola de aplicație Zoho
    }
  });

  const mailOptions = {
    from: `"Formular Clujul Meu" <contact@clujulmeu.com>`,
    to: "contact@clujulmeu.com",
    subject: `Mesaj nou de la ${name}`,
    text: `Email: ${email}\n\nMesaj:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Email trimis cu succes!' });
  } catch (error) {
    console.error("Eroare la trimitere:", error);
    res.status(500).send({ success: false, message: 'Eroare la trimitere.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server pornit pe http://localhost:${PORT}`);
});

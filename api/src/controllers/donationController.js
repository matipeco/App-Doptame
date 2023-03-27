const nodemailer = require('nodemailer');
const Apa = require('../models/Apa');
const User = require('../models/User');
require("dotenv").config();

const sendDonationNotification = async (req, res) => {
    try{
        const { apaId, userId } = req.body; // Diego: Verificar apaId y userId
        // Diego: Acá quiero optener apa y user a través de sus Ids
        const apa = await Apa.findById(apaId);
        const user = await User.findById(userId);

        // Enviar notificación a la APA:
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { // Diego: En mi archivo .env aún no tengo los datos de EMAIL_ADMIN e EMAIL_PASS
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: apa.email,
            subject: "Ha recibido una nueva donación",
            text: `Hola ${apa.name},\n\nTe informamos que has recibido una nueva donación de ${user.name}. \n\n¡Gracias por tu enorme trabajo apoyando animalitos que lo necesitan!\n\nAtentamente,\nEl equipo de AppDoptame`,
        };

        await transporter.sendMail(mailOptions);

        // Enviar notificación al usuario donante
        const userMessage = {
            from: process.env.EMAIL_ADMIN,
            to: user.email,
            subject: "Ha realizado una donación",
            text: `Hola ${user.name},\n\nGracias por tu donación a ${apa.name}. \n\nTu compromiso hace posible la labor de quienes apoyan a estos animalitos indefensos.\n\nAtentamente,\nEl equipo de AppDoptame`,
        };

        await transporter.sendMail(userMessage);

        res.status(201).json({ message: "Donación realizada con éxito" });

    } catch(error) {
        console.error(error);
        throw new Error ("No se pudo enviar la notificación por correo electrónico");
    }
}

// Diego: Ahora hago una función para procesar la donación y llamo a la función sendDonationNotification
// Ver si esta parte es necesaria porque solo guarda en la DB la info de la donación que no la pido en mi modelo.
const postDonation = async (req, res) => {
    try {
      const { apaId, userId, amount } = req.body;
  
      const apa = await APA.findById(apaId);
      if (!apa) {
        return res.status(404).json({ message: "APA not found" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Guardar la donación en la base de datos
      // ...
  
      // Enviar la notificación por correo electrónico
      await sendDonationNotification(apaId, userId);
  
      res.status(201).json({ message: "Donation saved" });
    } catch (error) {
      console.error(error)
    };
}
  

module.exports = { sendDonationNotification, postDonation };
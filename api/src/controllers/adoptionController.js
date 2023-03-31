const nodemailer = require('nodemailer');
const Apa = require('../models/Apa');
const User = require('../models/User');
const Pet = require('../models/Pet');
require("dotenv").config();

const sendAdoptionNotification = async (req, res, currentUser) => {
    try {
        const { apaId, petId } = req.body; // userId,
        const apa = await Apa.findById(apaId);
        //const user = await User.findById(userId);
        const pet =  await Pet.findById(petId);

        // Enviar notificación a la APA:
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { 
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: apa.email,
            subject: `Solicitud de adopción de ${pet.name}`,
            text: `Hola ${apa.name},\n\nTe informamos que has recibido una solicitud de adopción de ${user.name} para la mascota ${pet.name} con ID N°: ${pet.id}.\n\nPara continuar el proceso, te dejamos todos los datos de contacto del adoptante:\n\n- Nombre y Apellido: ${user.name} ${user.last_name}\n- Usuario: ${user.username}\n- Email: ${user.email}\n- Localización: ${user.location}\n- Teléfono: ${user.phone}\n\nTe sugerimos realizar todas las verificaciones que consideres necesarias y solicitar los datos adicionales que creas pertinentes.\nAhora el proceso queda en tus manos, esperamos que ${pet.name} pueda encontrar un buen hogar.\n\n¡Gracias por tu enorme trabajo apoyando animalitos que lo necesitan!\n\nAtentamente,\nEl equipo de AppDoptame`,
        };

        await transporter.sendMail(mailOptions);

        const userMessage = {
            from: process.env.EMAIL_ADMIN,
            to: user.email,
            subject: `Ha solicitado adoptar a ${pet.name}`,
            text: `Hola ${user.name},\n\nHas iniciado el proceso para adoptar a ${pet.name} con ID N°: ${pet.id}.\n\nMuy pronto se pondrán en contacto desde la Asociación Protectora ${apa.name} para indicarte cómo continuar con el proceso.\n\nEsperamos que todo resulte bien y hayas encontrado tu nuevo mejor amigo.\n\nTe dejamos un link para que califiques a ${apa.name} una vez que termines el proceso de adopción: \n\nAtentamente,\nEl equipo de AppDoptame`, // Diego: Me falta el link para calificar la Apa.
        };

        await transporter.sendMail(userMessage);

        res.status(201).json({ message: "Solicitud de adpción enviada con éxito" });
        
    } catch (error) {
        console.error(error);
        throw new Error ("No se pudo enviar la notificación por correo electrónico");
    }
}

module.exports = { sendAdoptionNotification };
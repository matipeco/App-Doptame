const apaSchema = require("../models/Apa");

const apaHandler = async (req, res) => {
  const apa = apaSchema(req.body); // pedimos todas las propiedades del esquema.
  apa
    .validate() // validamos que manden las props.
    .then(() => {
      apa
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    })
    .catch((error) => {
      const errors = error.errors; // guardo los errores en const.
      const message = `Por favor completar: ${Object.keys(errors) // guardo el mensaje con error de la propiedad.
        .map((key) => `${key}`) // mapeo la propiedad.
        .join(", ")}`;
      res.status(400).send(message);
    });
};

module.exports = apaHandler;

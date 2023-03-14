const apaSchema = require("../models/Apa");

const apaHandler = async (req, res) => {
  /* const { name, password, email, cbu_cvu, description, location, url } =
    req.body;
  if (
    !name ||
    !password ||
    !email ||
    !cbu_cvu ||
    !description ||
    !location ||
    !url
  )
    return res.status(404).send("Please complete the data");*/
  if (!req.body) {
    return res.json(error.message);
  }
  const apa = apaSchema(req.body);
  apa
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

/*  const apa = apaSchema(req.body);
  apa
    .validate()
    .then(() => {
      apa
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    })
    .catch((error) => {
      const errors = error.errors;
      const message = `Apa validation failed: ${Object.keys(errors)
        .map((key) => `${key}: ${errors[key].message}`)
        .join(", ")}`;
      res.status(400).json({ message });
    });
};
 */

module.exports = apaHandler;

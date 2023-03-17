const apaSchema = require("../models/Apa");
const { createApa, putApa, getApaById, getAllApas, getApasByName, deleteApaById } = require('../controllers/apaController');

// POST| /create
const createApaHandler = async (req, res) => {
  try {
      const { name, password, email, cbu_cvu, description, location, url } = req.body;  
      const newApa = await createApa(name, password, email, cbu_cvu, description, location, url);  
      res.status(200).json(newApa);  
  } catch (error) {
      res.status(404).send(error.message);
  }
};

// PUT| /edit/:id 
const putApaHandler = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, password, email, cbu_cvu, description, location, url } = req.body;  
      const modApa = await putApa(id, name, password, email, cbu_cvu, description, location, url);  // {id, name, password, email, cbu_cvu, description, location, url}
      res.status(200).json(modApa);  
  } catch (error) {
      res.status(404).send(error.message);
  }
};

// GET BY ID| /:id
const getApaByIdHandler = async (req, res) => { 
  const { id } =  req.params;
  console.log(req.params);
    try {
        const apaById = await getApaById(id);      
        if(!apaById) throw new Error ('La APA que deseas modificar no existe :(');  
        res.status(200).json(apaById);  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };

// GET ALL| /
const getAllApasHandler =  async (req, res) => {
  const { name }  = req.query;  
  try {
      const results = name ? await getApasByName(name) : await getAllApas()
      if(!results) throw new Error('Apa no encontrada :(');
      res.status(200).json(results);
  } catch (error) {
      res.status(404).send(error.message);
  };
};

// DELETE BY ID| /delete/:id
const deleteApaByIdHandler = async (req, res) => { 
  const { id } =  req.params;
    try {
        const apaById = await deleteApaById(id);      
        if(!apaById) throw new Error ('La APA que deseas eliminar no existe :(');  
        res.status(200).json(apaById);  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };


// Todo esto desarrollado por Nati
// const apaHandler = async (req, res) => { // Diego: comentado
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
  
  /*  if (!req.body) { // Diego: comentado
    return res.json(error.message);
  }
  const apa = apaSchema(req.body);
  apa
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}; */

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

module.exports = { 
    createApaHandler,
    putApaHandler,
    getApaByIdHandler,
    getAllApasHandler,
    deleteApaByIdHandler
 }; // Diego: Acá puedo hacer destructuring y mandar handler por handler. Antes apaHandler

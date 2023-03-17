const { Router } = require("express");
const apaRouter = Router();
const { 
        createApaHandler, 
        putApaHandler, 
        getApaByIdHandler, 
        getAllApasHandler, 
        deleteApaByIdHandler 
    } = require("../handlers/apaHandler"); // Diego: Traerme todos los handlers con destructuring (antes solo apaHandler)

// apaRouter.post("/", apaHandler); ---> Nati

// Diego: Voy a modularizar todas las rutas para más orden. 

apaRouter.post('/', createApaHandler);

apaRouter.put('/:id', putApaHandler); 

apaRouter.get('/:id', getApaByIdHandler); 

apaRouter.get('/', getAllApasHandler); // Diego: Nuevo

apaRouter.delete('/:id', deleteApaByIdHandler); // Diego: Nuevo

module.exports = apaRouter;

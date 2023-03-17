const { Router } = require("express");
const apaRouter = Router();
const { 
        createApaHandler, 
        putApaHandler, 
        getApaByIdHandler, 
        getAllApasHandler, 
        deleteApaByIdHandler 
    } = require("../handlers/apaHandler"); 
    

apaRouter.post('/', createApaHandler);

apaRouter.put('/:id', putApaHandler); 

apaRouter.get('/:id', getApaByIdHandler); 

apaRouter.get('/', getAllApasHandler); // Diego: Nuevo

apaRouter.delete('/:id', deleteApaByIdHandler); // Diego: Nuevo

module.exports = apaRouter;

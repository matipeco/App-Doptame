interface InputData {
    name: string;
    age: string;
    description: string;
    image: string;
    size: string;
    type: string;
    adoption: boolean;
    status: boolean;
  }
  
  interface Errors {
    name?: string;
    age?: string;
    description?: string;
    image?: string;
    size?: string;
    type?: string;
    adoption?: string;
    status?: string;
  }
  
  const validate = (input: InputData): Errors => {
    let errors: Errors = {};
    if (!input.name) {
      errors.name = 'Ingrese un Nombre';
    }
    if (!input.age) {
      errors.age = 'Ingrese una Edad';
    }
    if (!input.description) {
      errors.description = 'Ingrese una Descripción';
    }
    if (!input.image) {
      errors.image = 'Cargue una imagen';
    }
    if (!input.size) {
      errors.size = 'Seleccione un Tamaño';
    }
    if (!input.type) {
      errors.type = 'Seleccione un Tipo de Mascota';
    }
    if (!input.adoption) {
      errors.adoption = 'Seleccione una opción';
    }
    if (!input.status) {
      errors.status = 'Seleccione una opción';
    }
    return errors;
  };
  
  export default validate;
  
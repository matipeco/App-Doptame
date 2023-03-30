export interface Pet {
  _id?: string
  name: string
  age: number
  size: string
  type: string
  image: string
  adoption: boolean
  status: boolean
  apa?: {
    location: string
    name: string
  }
  description: string
}

export interface Apa {
  _id?: string
  name?: string
  username?: string
  password?: string
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  pets?: []
  telephone?: string
  provincia?: string
  cuit?: string
}
export interface User {
  _id?: string;
  name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  email?: string;
  location?: string;
  image?: string;
  pet?: {};
  favorites?: {
    pet: Pet;
  }[];
  token?: string;
  resetPasswordKey?: string;
  googleId?: string;
}


export interface InputData {
  name?: string;
  username?: string;
  password?: string;
  passwordLogin?: string,
  last_name?: string;
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  cuit?: string
  telephone?: string
  provincia?: string
  age?: Number
  size?: string
  type?: string

}

export type errorsInput = {
  name?: string;
  username?: string;
  password?: string;
  passwordLogin?: string;
  last_name?: string;
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  cuit?: string
  provincia?: string
  telephone?: string
  age?: string
  size?: string
  type?: string
};







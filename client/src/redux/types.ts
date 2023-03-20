export interface Pet {
  _id?: string
  name: string
  age: number
  size: string
  type: string
  image: string
  adoption: boolean
  status: boolean
  apa?: string
  description: string
}

export interface Apa {
  _id: string
  name: string
  password: string
  email: string
  location: string
  description: string
  cbu_cvu: string
  url: string
  pets: []
}

export interface User {
  _id?: string
  name: string
  last_name: string
  username: string
  password: string
  email: string
  location: string
  image: string
  pet?: {}
}


export interface InputData {
  name?: string;
  username?: string;
  password?: string;
  last_name?: string;
  email?: string
  location?: string
}

export type errorsInput = {
  name?: string;
  username?: string;
  password?: string;
  last_name?: string;
  email?: string
  location?: string

};


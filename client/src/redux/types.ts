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


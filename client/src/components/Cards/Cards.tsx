// import { FunctionComponent } from 'react'
import { Card } from '../Card/Card'
import style from './Cards.module.css'
// import { useDispatch, useSelector } from 'react-redux'

export type Pet = {
  id: string
  name: string
  age: string
  size: string
  type: string
  image: string
  adoption: boolean
  status: boolean
  description: string
  apa: string
}

const pets: Pet[] = [
  {
    id: "1",
    name: "Jacinto",
    age: "1 año",
    size: "chico",
    type: "gato",
    image: "https://okdiario.com/img/2022/08/22/gato.jpg",
    adoption: true,
    status: true,
    description: "asjhdnosikd,añsd,asd",
    apa: "1"
  },
  {
    id: "2",
    name: "Pepe",
    age: "2 años",
    size: "grande",
    type: "perro",
    image: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
    adoption: true,
    status: true,
    description: "asjhdnosikd,añsd,asd",
    apa: "1"
  },
  {
    id: "3",
    name: "Frida",
    age: "3 años",
    size: "chico",
    type: "gato",
    image: "https://www.consumer.es/app/uploads/fly-images/110103/cat-geebaeec-1200x550-cc.jpg",
    adoption: true,
    status: true,
    description: "asjhdnosikd,añsd,asd",
    apa: "1"
  },
  {
    id: "4",
    name: "Marta",
    age: "8 años",
    size: "chico",
    type: "gato",
    image: "https://www.hogarmania.com/archivos/201705/mascotas-tortugas-terrestres-reptiles-1280x720x80xX.jpg",
    adoption: true,
    status: true,
    description: "asjhdnosikd,añsd,asd",
    apa: "1"
  }
]

export const Cards = () => {
  // const dispatch = useDispatch();
  // const allPets: Pets = useSelector((state: { allPets: Pets }) => state.allPets);

  return (
    <>
      <div className={style.cardContainer}>
        {
          pets.map((pet) => (
            <Card key={pet.id} pet={pet} />
          ))
        }
      </div>
    </>
  )
}

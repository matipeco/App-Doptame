import React from 'react'
import style from './Detail.module.css'
import { Pet } from '../../components/Cards/Cards'
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


const Detail = () => {
  // const dispatch = useDispatch();
  //   const { id } = useParams();
  // const pet = useSelector((state) => state.detail)
  const [pet, setPet] = useState<Pet>();

  // const pet: Pet = {
  //   id: "4",
  //   name: "Marta",
  //   age: "8 años",
  //   size: "chico",
  //   type: "gato",
  //   image: "https://www.hogarmania.com/archivos/201705/mascotas-tortugas-terrestres-reptiles-1280x720x80xX.jpg",
  //   adoption: true,
  //   status: true,
  //   description: "Es una gatita muy buena y mimosa, le gusta el atun y ronronear todo el dia. Fue encontrada en la calle durante un dia de lluvia. ",
  //   apa: "1"
  // }

  //   useEffect(() => {
  //       dispatch(getPetDetail(id))
  //   }, [dispatch, id])//warning

  useEffect(() => {
    setPet({
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
    })
  }, [])//warning

  //   if (!pet.image && !pet.types && !pokemon.id && !pokemon.attack && !pokemon.life) return <Loading />

  if (!pet) return <div>Loading...</div>;

  return (
    <div className={style.container}>
      <article className={style.card} >
        <img src={pet.image} alt={pet.name} />
        <h2>{pet.name}</h2>
        <p>{pet.size}</p>
        <p>{pet.description}</p>
        <button>Adoptame</button>
      </article>
    </div>
  )
}

export default Detail
import { FunctionComponent } from 'react'
import { Pet } from '../../redux/types'
import style from './Card.module.css'
import { Link } from 'react-router-dom'

type Props = {
  pet: Pet
}

export const Card: FunctionComponent<Props> = ({ pet }) => {
  return (
    <article className={style.card}>


      <img src={pet.image} alt={pet.name} />
      <h3>{pet.name}</h3>
      <Link className={style.link} to={`/detail/${pet._id}`}>
        Conoceme...
      </Link>
    </article>

  )
}

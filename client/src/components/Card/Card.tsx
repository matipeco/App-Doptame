import { FunctionComponent, useState } from 'react'
import { Pet } from '../../redux/types'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postFavorite, deleteFavorite } from '../../redux/actions/actions'

type Props = {
  pet: Pet
}

export const Card: FunctionComponent<Props> = ({ pet }) => {
    // const dispatch = useDispatch()
    const [isFav, setIsFav] = useState(false);

    const handlerIsFav  = async () => {
      if(isFav){
        setIsFav(false)
        if (pet._id) { // comprueba que pet._id no sea undefined antes de llamar a la acción
          // await dispatch(deleteFavorite(pet._id))
        }
      }else{
        setIsFav(true);
        if(pet){
          // await dispatch(postFavorite(pet)); // llamada a addFavorite
        }
    
      }
    }

    
  return (
    <article className={style.card}>
    
      <img src={pet.image} alt={pet.name} className={style.img} />
      <h3>{pet.name}</h3>
      <h3>{pet.age} Años</h3>
      <h3>{pet.size}</h3>
      <div>
      <Link className={style.link} to={`/detail/${pet._id}`}>
        Conoceme...
      </Link>
      {
            isFav ? (<button onClick={handlerIsFav} className={style.botonFav}>❤️</button>) 
            : (<button onClick={handlerIsFav} className={style.botonFav}>🤍</button>)
      }
      </div>
    
    </article>

  )
}

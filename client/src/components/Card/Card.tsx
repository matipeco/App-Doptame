import { FunctionComponent, useState } from 'react'
import { Pet } from '../../redux/types'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postFavorite, deleteFavorite } from '../../redux/actions/actions'
import { AnyAction } from 'redux';

type Props = {
  pet: Pet
}

export const Card: FunctionComponent<Props> = ({ pet }) => {
    const dispatch = useDispatch()
    const [isFav, setIsFav] = useState(false);

    const handlerIsFav = async () => {
      const token = localStorage.getItem("token");
    
      if (token) {
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        const user = JSON.parse(decodedPayload);
        console.log(user.id);
        console.log(pet)
        try {
          if (isFav) {
            dispatch(deleteFavorite(pet._id ?? '', user.id) as unknown as AnyAction)
          } else {
            dispatch(postFavorite(pet._id ?? '', user.id) as unknown as AnyAction)
          }
          setIsFav(!isFav); // actualizar el estado después de que la acción se complete
        } catch (error) {
          console.error(error);
        }
      }
    };

    
  
    

    
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
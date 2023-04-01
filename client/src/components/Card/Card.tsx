import { FunctionComponent, useState } from 'react'
import { Pet } from '../../redux/types'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postFavorite, deleteFavorite } from '../../redux/actions/actions'
import { AnyAction } from 'redux';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';


type Props = {
  pet: Pet
}

export const Card: FunctionComponent<Props> = ({ pet }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  
  const [isFav, setIsFav] = useState(() => {
      const storedValue = localStorage.getItem(`fav-${pet._id}`)
      return storedValue ? JSON.parse(storedValue) : false
  });

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  
  useEffect(() => {
      localStorage.setItem(`fav-${pet._id}`, JSON.stringify(isFav));
  }, [isFav, pet._id])

  const handlerIsFav = async (userId: string) => {
      try {
          if (isFav) {
              dispatch(deleteFavorite(pet._id ?? '', userId) as unknown as AnyAction)
          } else {
              dispatch(postFavorite(pet._id ?? '', userId) as unknown as AnyAction)
          }
          setIsFav(!isFav);
      } catch (error) {
          console.error(error);
      }
  };

  // Agrega este código para mostrar el botón X cuando el usuario está en la ruta de favoritos
  const showXButton = location.pathname.startsWith("/favorites");
  
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
              {showXButton ? (
                  <button onClick={() => {
                      dispatch(deleteFavorite(pet._id ?? '', user.id) as unknown as AnyAction)
                      window.location.reload(); // recargar la página después de borrar el favorito
                  }} className={style.botonFav}>
                      X
                  </button>
              ) : (
                  user ? (
                      isFav ? (
                          <button onClick={() => handlerIsFav(user.id)} className={style.botonFav}>❤️</button>
                      ) : (
                          <button onClick={() => handlerIsFav(user.id)} className={style.botonFav}>🤍</button>
                      )
                  ) : null
              )}
          </div>
      </article>
  )
}
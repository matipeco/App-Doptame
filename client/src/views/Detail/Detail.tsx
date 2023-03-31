import style from './Detail.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { StateType } from '../../redux/reducer/reducer';
import { getDetailPets, clearDetail, adoptPet } from '../../redux/actions/actions';
import { AnyAction } from 'redux';
import { Reducer } from '../../redux/store/store';
import {User, UserType} from "../../redux/types";


const logueados = useSelector((state: Reducer) => state.Loguins);

export interface StateType {
  currentUser: User;
  allUsers: User[];
}



export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pet = useSelector((state: Reducer) => state.detail);
  const allUsers = useSelector((state: Reducer) => state.allUsers);
  useEffect(() => {
    dispatch(getDetailPets(id!) as unknown as AnyAction);
    dispatch(clearDetail());
  }, [id, dispatch]);

  const handleAdoptButtonClick = (user: User) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas adoptar a esta mascota?"
    );
    if (confirmed) {
      // Enviamos la notificación a través de la API y le pasamos el id del usuario seleccionado
      const usuario: UserType = {
        apaId: pet?.apa?._id,
        userId: user._id,
        petId: pet._id,
      }
      dispatch(adoptPet(usuario, id)as unknown as AnyAction);
    }
  };

  /* const handleAdoptButtonClick = (user: User) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas adoptar a esta mascota?"
    );
    if (confirmed) {
      // Llamada a la acción adoptPet con los datos necesarios
      dispatch(adoptPet({
        name: pet?.name,
        size: pet?.size,
        description: pet?.description,
        apa: pet?.apa,
        image: pet?.image,
        adopter: user._id,
      }, id) as unknown as AnyAction);
    }
  }; */

  return (
    <div className={style.container}>
      <article className={style.card}>
        <img src={pet?.image} alt={pet?.name} />
        <h2>{pet?.name}</h2>
        <p>{pet?.size}</p>
        <p>{pet?.description}</p>
        <div>
          {allUsers.map(user => (
            <div key={user._id}>
              <p>{user.name}</p>
              <button onClick={() => handleAdoptButtonClick(user)}>Adoptar</button>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Detail;
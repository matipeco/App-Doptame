import style from './Detail.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { StateType } from '../../redux/reducer/reducer';
import { getDetailPets, clearDetail, botonAdopt } from '../../redux/actions/actions';
import { AnyAction } from 'redux';
import { Reducer } from '../../redux/store/store';
import { User } from "../../redux/types";
import { Navigate } from 'react-router-dom';




export interface StateType {
  currentUser: User;
  allUsers: User[];
}



export const Detail = () => {
  const logueados = useSelector((state: Reducer) => state.Loguins);
  const navigate = useNavigate()
  const user_id: any = logueados?.userFound?._id
  console.log(user_id)
  const dispatch = useDispatch();
  const { id } = useParams();
  const pet = useSelector((state: Reducer) => state.detail);
  // const allUsers = useSelector((state: Reducer) => state.allUsers);



  useEffect(() => {
    dispatch(getDetailPets(id!) as unknown as AnyAction);
    dispatch(clearDetail());
  }, [id, dispatch]);

  const handleAdoptButtonClick = async (user: User) => {
    try {
      await dispatch(botonAdopt(pet._id, user_id) as any as AnyAction);
      navigate("/home")

      // Aquí actualizas el estado de tu aplicación para reflejar que esa mascota ya no está disponible para adopción.
    } catch (error: any) {
      alert(error.message);
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

          <button onClick={() => handleAdoptButtonClick(user_id)}>Adoptar</button>
        </div>


      </article>
    </div>
  );
};

export default Detail;
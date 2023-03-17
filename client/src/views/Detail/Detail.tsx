import style from './Detail.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { StateType } from '../../redux/reducer/reducer';
import { getDetailPets } from '../../redux/actions/actions';
import { AnyAction } from 'redux';
import { Reducer } from '../../redux/store/store';


export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pet = useSelector((state: Reducer) => state.detail);

  useEffect(() => {
    dispatch(getDetailPets(id!) as unknown as AnyAction);
  }, [id, dispatch]);

  return (
    <div className={style.container}>
      <article className={style.card}>
        <img src={pet?.image} alt={pet?.name} />
        <h2>{pet?.name}</h2>
        <p>{pet?.size}</p>
        <p>{pet?.description}</p>
        <button>Adoptame</button>
      </article>
    </div>
  );
};

export default Detail;
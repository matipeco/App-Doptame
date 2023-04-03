import { FunctionComponent, useState } from 'react'
import { Pet } from '../../redux/types'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postFavorite, deleteFavorite, getFavorite } from '../../redux/actions/actions'
import { AnyAction } from 'redux';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Reducer } from "../../redux/store/store"
import {AiOutlineDelete} from 'react-icons/ai'

type Props = {
    pet?: Pet



}
export const Card: React.FunctionComponent<Props> = ({ pet, }) => {
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const user_id: any = logueados.userFound?._id;
    const location = useLocation();
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    const handlerIsFav = async (userId: string) => {
        try {
            if (isFav) {
                dispatch(deleteFavorite(pet?._id ?? '', user_id) as unknown as AnyAction)
            } else {
                dispatch(postFavorite(pet?._id ?? '', user_id) as unknown as AnyAction);
            }
            setIsFav(!isFav);
        } catch (error) {
            console.error(error);
        }
    };
    const handlerDeleteFavorite = (petId?: string) => {
        if (petId) {
            try {

                dispatch(deleteFavorite(petId, user_id) as unknown as AnyAction);

            } catch (error) {
                console.error(error);
            }
        }
        console.log(petId, user_id)
    };


    const showXButton = location.pathname.startsWith("/favorites");

    return (
        <article className={style.card}>
            <img src={pet?.image} alt={pet?.name} className={style.img} />
            <h3>{pet?.age} Años</h3>
            <h3>{pet?.size}</h3>
            <div className={style.btns}>
                <button className={style.conoceme}>
                <Link className={style.link} to={`/detail/${pet?._id}`}>
                    Conoceme...
                </Link>
                </button>
                {showXButton ? (
                    <button onClick={() => handlerDeleteFavorite(pet?._id)} className={style.botonFav}>
                        <AiOutlineDelete/>
                    </button>
                ) : (
                    logueados.userFound ? (
                        isFav ? (
                            <button onClick={() => handlerIsFav(user_id)} className={style.botonFav}>❤️</button>
                        ) : (
                            <button onClick={() => handlerIsFav(user_id)} className={style.botonFav}>🤍</button>
                        )
                    ) : null
                )}
            </div>
        </article>
    )
}
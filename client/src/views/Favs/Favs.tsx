import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { getFavorite, } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import { Card } from '../../components/Card/Card'
import './Favs.css'

export const Favs = () => {
    const dispatch = useDispatch();
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const user_id: any = logueados.userFound?._id;
    const { favorites } = useSelector((state: Reducer) => state.favoriteUser);
    console.log(favorites)
    useEffect(() => {

        dispatch(getFavorite(user_id) as unknown as AnyAction);
    }, []);



    return (
        <div className='asd'>
        <div className='container-favs'>
            {favorites?.map((favorite) => (
                <Card
                    key={favorite.pet?._id}
                    pet={favorite.pet}
                />
            ))}
        </div>
        </div>
    );
};

export default Favs;
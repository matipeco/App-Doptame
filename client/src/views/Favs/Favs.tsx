import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { getFavorite } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import {Card} from '../../components/Card/Card'
import { Pet } from '../../redux/types';


const Favs = () =>{
    const {id} = useParams();
    const myFavorite = useSelector((state: Reducer) => state.favoriteUser)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavorite(id!) as unknown as AnyAction); // Cargar los favoritos del usuario al montar el componente
    }, [id, dispatch]);
    console.log(myFavorite.favorites);
    
    return(
        <div className='container-favs'>
           { myFavorite.favorites?.map((el)=> (
            <Card key={el.pet._id} pet={el.pet}  />
           ) ) }
           
        </div>
  );
    }

export default Favs; 

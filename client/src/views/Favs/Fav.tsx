import React from 'react';
import { useSelector } from 'react-redux';
import { Pet } from '../../redux/types';
import { Card } from '../../components/Card/Card';
import './Fav.css'

interface RootState {
    myFavorite: Pet[];
  }


const Fav = () =>{
    const {myFavorite} = useSelector((state: RootState) => state)

    return(
        <div className='container-favs'>
            {
                myFavorite.map(pet => (
                    <Card
                    key={pet._id} 
                    pet={pet}
                    />
                ))
            }
        </div>
    )
}

export default Fav;
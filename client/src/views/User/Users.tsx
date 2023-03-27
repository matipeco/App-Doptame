import React, { useEffect } from 'react'
import { getDetailUsers, clearDetail } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Reducer } from '../../redux/store/store';

import { AnyAction } from 'redux'
import UserPerfil from './UserPerfil'
import { User } from '../../redux/types'


function Users() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const user = useSelector((state: Reducer) => state.detailUser);

  useEffect(() => {
    dispatch(getDetailUsers(id!) as unknown as AnyAction)
    dispatch(clearDetail());
  }, [id, dispatch])


  return (
    <div >
      <article >

        <img src={user?.image} alt={user?.name} />
        <h2>Usuario {user?.name} {user.last_name}</h2>
        <p>{user?.email}</p>
        <p>{user?.location}</p>
        <button>Mis Favoritos</button>
      </article>
    </div>
  );
}

export default Users
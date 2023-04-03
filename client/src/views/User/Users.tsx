import React, { useEffect } from 'react'
import { getDetailUsers, clearDetail } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Reducer } from '../../redux/store/store';
import './User.css'
import { AnyAction } from 'redux'



function Users() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const user = useSelector((state: Reducer) => state.detailUser);

  useEffect(() => {
    dispatch(getDetailUsers(id!) as unknown as AnyAction)
    dispatch(clearDetail());
  }, [id, dispatch])


  return (
    <div className='ContenedorUser'>
      <article className='CartaUsuario'>

        <div className="imgUser">
          <img src={user?.image} alt={user?.name} />
        </div>

        <div className="infoUser">
          <h2>Usuario:{user?.name} {user.last_name}</h2>
          <p>Email:{user?.email}</p>
          <p>Ubicacion: {user?.location}</p>
        </div>

        <div className="contenedorBtn">
          <button>
            Mis Favoritos
          </button>
        </div>

      </article>
    </div>
  );
}

export default Users
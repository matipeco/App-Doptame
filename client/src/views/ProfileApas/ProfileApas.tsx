import React, { useEffect} from 'react';
import { Apa } from '../../redux/types';
import { getApaById } from '../../redux/actions/actions';
import img from '../../assets/logo.png'
import './ProfileApas.css'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction} from 'redux';
import { useParams } from 'react-router-dom';
import {Reducer} from '../../redux/store/store'

export default function ProfileApas(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const apa = useSelector((state: Reducer) => state.detailApa )

    useEffect(() => {
        dispatch(getApaById(id!) as unknown as AnyAction)
    }, [id,dispatch])
    console.log(apa);
    return(
        <div className='containerApaProfile'>
        <div className="containerTitleApa">
            <div className="esteEselh1">
                <h1 className='h1title'>{apa.name}</h1>
            </div>
            <div className="contenedordeLogo">
                <img className='imgLogo' src={img} alt='logo de la apa'/>

            </div>
        </div>
        
        <div className='containerDescription'>
            <div className='column'>
                <h4>Email: {apa.email}</h4>
                <h4>Cbu/Alias: {apa.cbu_cvu}</h4>
                <h4>Ubicacion: {apa.location}, {apa.provincia}</h4>
            </div>
            <div className="column">
                <h4>botonURL: perfilIg</h4>
                <h4>Telefono: {apa.provincia} </h4>
            </div>
        </div>
        <div className="containerDescription">
            <p>{apa.description}</p>
            </div>

            <div className='containerBtnDonate'>
            <button>
                Donar
            </button>
        </div>

        <div className='containerCarrusel'>

        </div>
        
        </div>
    )
}
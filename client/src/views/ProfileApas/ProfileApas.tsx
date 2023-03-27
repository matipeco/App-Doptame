import React, { useEffect} from 'react';
import { Apa } from '../../redux/types';
import { getApaById } from '../../redux/actions/actions';
import img from '../../assets/logo.png'
import './ProfileApas.css'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction} from 'redux';
import { useParams } from 'react-router-dom';
import {Reducer} from '../../redux/store/store'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from '../../assets/assetosCarruselPrueba/img1.jpg'
import img2 from '../../assets/assetosCarruselPrueba/img2.jpg'
import img3 from '../../assets/assetosCarruselPrueba/img4.jpg'
import img4 from '../../assets/assetosCarruselPrueba/img5.jpg'
import img5 from '../../assets/assetosCarruselPrueba/img6.jpg'
import fb from '../../assets/logofb.png'
import ig from '../../assets/logoig.png'
import {SiMercadopago} from 'react-icons/si'


export default function ProfileApas(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const apa = useSelector((state: Reducer) => state.detailApa )

    useEffect(() => {
        dispatch(getApaById(id!) as unknown as AnyAction)
    }, [id,dispatch])

    const images = [img1, img2, img3, img4, img5];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    }




    console.log(apa);
    return(
        <div className='containerApaProfile'>
        <div className="containerTitleApa">
                <h1 >{apa.name}</h1>
                <img  src={img} alt='logo de la apa'/>
        </div>
        
        <div className='containerDescription'>
            <div className='column'>
                <h4>Email: {apa.email}</h4>
                <h4>Cbu/Alias: {apa.cbu_cvu}</h4>
                <h4>Ubicacion: {apa.location}, {apa.provincia}</h4>
            </div>
            <div className="column">
            <a href={apa.url}>
            <img className='logoigfb' src={fb} alt="Logo de Facebook" />
            <img className='logoigfb' src={ig} alt="Logo de Instagram" />
            </a>
                <h4>Telefono: {apa.provincia} </h4>
            </div>
        </div>
        <div className="containerDescription">
            <p>Descripcion: {apa.description}</p>
            </div>

            <div className='containerBtnDonate'>
                
            <button>
                <h5> Donar </h5>
            </button>
        </div>

        <div className='containerCarruselperros'>
        <Slider {...settings}>
            {images.map((image, index) => ( 
                <div key={index}>
                    <img className='imgCarrusel' src={image} alt={`image-${index}`} />

                </div>
            ))}

        </Slider>


        </div>
        
        </div>
    )
}
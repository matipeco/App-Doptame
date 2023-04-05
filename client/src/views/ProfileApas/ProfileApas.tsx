import React, { useEffect } from 'react';
import { clearDetailApa, getApaById } from '../../redux/actions/actions';
import './ProfileApas.css'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { useParams } from 'react-router-dom';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Reducer } from '../../redux/store/store';
import avatarApa from '../../assets/avatarApa.png'
import { Link } from 'react-router-dom';
import img1 from '../../assets/assetosCarruselPrueba/img1.jpg'
import img2 from '../../assets/assetosCarruselPrueba/img2.jpg'
import img3 from '../../assets/assetosCarruselPrueba/img4.jpg'
import img4 from '../../assets/assetosCarruselPrueba/img5.jpg'
import img5 from '../../assets/assetosCarruselPrueba/img6.jpg'
import fb from '../../assets/logofb.png'
import ig from '../../assets/logoig.png'
import { BsPencilSquare } from "react-icons/bs"
import { BsFillEnvelopeAtFill } from "react-icons/bs"
export default function ProfileApas() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const apa = useSelector((state: Reducer) => state.detailApa)

    const logueados = useSelector((state: Reducer) => state.Loguins);

    useEffect(() => {
        dispatch(getApaById(id!) as unknown as AnyAction)
        dispatch(clearDetailApa())

    }, [id, dispatch])

    const petImages = apa?.pets?.map(pet => pet.image);
    const imagenes = petImages?.filter(image => image !== undefined);


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


    // console.log(apa.pets, "pets?")
    // console.log(apa)

    //sumo los rating
    // let sum = apa.reviews?.reduce((total, review) => total + Number(review.rating), 0)

    // // Verificar que sum sea un número o undefined
    // if (typeof sum !== "number") {
    //     sum = undefined;
    // }
    // //Saco el promedio
    // const prom = apa.reviews?.length && sum !== undefined ? sum / apa.reviews.length : undefined;

    // //guardo el promedio
    // const promRating = prom?.toFixed(2);

    // const filledStars = promRating ? parseInt(promRating) : 0;
    // const emptyStars = promRating ? 5 - parseInt(promRating) : 5;



    return (
        <div className='containerApaProfile'>
            <div className="containerTitleApa">
                <h1 >{apa.name}</h1>
                <img className='imgApaProfile' src={avatarApa} alt='avatar apa' />

            </div>
            <Link to={`/formEditApa/${logueados.apaFound?._id}`}> <BsPencilSquare style={{ marginLeft: '5px', fontSize: "20px" }} /></Link>
            <div className="botonesProfile">
                {logueados.userType === "apa" &&
                    <>

                        <button className='botonesApaProfile' ><Link className='letras' to={`/formPet`}>Agregar Mascota</Link></button>
                        <button className='botonesApaProfile'><Link className='letras' to={'/dashboardApa'}>Editar Mascotas</Link></button>
                    </>
                }
            </div>

            <div className='containerDescription'>
                <div className='column'>
                    <h4 className="h4ProfileApa">   <BsFillEnvelopeAtFill style={{ verticalAlign: 'middle' }} /> <span>{apa.email}</span></h4>
                    <h4 className="h4ProfileApa">Cbu/Alias: <span>{apa.cbu_cvu}</span> </h4>
                    <h4 className="h4ProfileApa">Ubicacion: <span>{apa.provincia}</span></h4>
                </div>
                {/* <div className="column">
                    <a href={apa.url}>
                        <img className='logoigfb' src={fb} alt="Logo de Facebook" />
                        <img className='logoigfb' src={ig} alt="Logo de Instagram" />
                    </a>
                    <h4>Telefono: {apa.provincia} </h4>
                    <h4 className='rating'>Rating: {[...Array(filledStars)].map((_, index) => (
                        <AiFillStar key={index} />
                    ))}
                        {[...Array(emptyStars)].map((_, index) => (
                            <AiOutlineStar key={index} />
                        ))} </h4>
                </div> */}
            </div>
            {apa.description ? (<div className="containerDescription">
                <p>{apa.description}</p>
            </div>
            ) : (<></>)}


            {logueados.userType === "user" &&
                <div className='containerBtnDonate'>
                    <button><h5> Donar </h5></button>
                </div>}

            {
                apa.pets && apa.pets.length > 0 ? (
                    <div className='containerCarruselperros'>
                        <Slider {...settings}>
                            {imagenes?.map((image, index) => (
                                <div key={index}>
                                    <img className='imgCarrusel' src={image} alt={`image-${index}`} />

                                </div>
                            ))}

                        </Slider>


                    </div>
                ) : (
                    <div className='containerCarruselperros'>
                        <Slider {...settings}>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img className='imgCarrusel' src={image} alt={`image-${index}`} />

                                </div>
                            ))}

                        </Slider>


                    </div>
                )
            }


        </div>
    )
}
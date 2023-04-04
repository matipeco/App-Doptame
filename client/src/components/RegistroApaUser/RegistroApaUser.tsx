import { Link } from "react-router-dom"
import { FunctionComponent } from 'react'
import style from './RegistroApaUser.module.css';
import { HiArrowLeft } from 'react-icons/hi';



type Props = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegistroApaUser: FunctionComponent<Props> = ({ setShowLogin }) => {

    const handleClick = () => {
        setShowLogin(true);
    }
    return (
        <>
            <button className={style.buttonLogin} onClick={handleClick}><HiArrowLeft /></button>
            <div className={style.containerArticle}>
                <article className={style.registroApa}>
                    <h3 className={style.tituloRegistrate}>Registrate como APA</h3>
                    <p className={style.parrafosRegistros}>Como Asociación Protectora de Animales (APA) tendrás un perfil donde podrás postear las mascotas que desees poner en adopcion y también habrá un apartado donde podrás recibir donaciones de otros usuarios. De esta forma, los usuarios podrán acceder a dicho perfl, visualizar las mascotas disponibles de la asociacion y realizar donaciones a la asociacion en cuestion.
                    </p>
                    <Link className={style.linkButtonApa} to={'/formApa'}>Registrate como APA</Link>
                </article>
                <article className={style.registroUser}>
                    <h3 className={style.tituloRegistrate}>Registrate como Usuario </h3>
                    <p className={style.parrafosRegistros}>Como usuario, tendras la posibilidad de crearte un perfil, adoptar animales y hacer donaciones. Tendrás acceso a un apartado donde visualizaras todas las mascotas disponibles para adoptar y tambien podrás guardar en tus favoritos las mascotas que desees. Luego de adoptar, podrás puntuar a la asociacion según la experiencia que hayas tenido.
                    </p>
                    <Link className={style.linkButtonUser} to={'/formUser'}>Registrate como Usuario</Link>
                </article>
            </div>

        </>
    )
}
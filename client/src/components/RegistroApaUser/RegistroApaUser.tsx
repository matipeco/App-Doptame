import { Link } from "react-router-dom"
import { FunctionComponent } from 'react'
import style from './RegistroApaUser.module.css';

type Props = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegistroApaUser: FunctionComponent<Props> = ({ setShowLogin }) => {

    const handleClick = () => {
        setShowLogin(true);
    }
    return (
        <>
            <button className={style.buttonLogin} onClick={handleClick}>Logueate</button>
            <div className={style.containerArticle}>
                <article className={style.registroApa}>
                    <h3 className={style.tituloRegistrate}>Registrate como APA (Asociacion Protectora de Animales )</h3>
                    <p className={style.parrafosRegistros}>Como APA tendrás un perfil donde podrás postear las mascotas que desees poner en adopcion y también habrá un apartado donde podrás recibir donaciones. De esta forma, los usuarios podrán acceder a dicho perfl, visualizar las mascotas disponibles de la asociacion y realizar donaciones a la asociacion en cuestion.
                    </p>
                    <Link className={style.linkButton} to={'/formApa'}>Registrate como APA</Link>
                </article>
                <article className={style.registroUser}>
                    <h3 className={style.tituloRegistrate}>Registrate como Usuario </h3>
                    <p className={style.parrafosRegistros}>Como usuario, tendras la posibilidad de crearte un perfil, adoptar animales o donar a alguna asociacion en particular. Podrás acceder a un apartado de la página donde visualizaras todas las mascotas que esten disponibles para adoptar. Podrás filtrar tu búsqueda según tus necesidades y acceder al detalle de la mascota que desees. De esta forma, a través de cada mascota podrás acceder al perfil de la asociacion que haya publicado la mascota que te interese.
                    </p>
                    <Link className={style.linkButton} to={'/formUser'}>Registrate como Usuario</Link>
                </article>
            </div>
        </>
    )
}
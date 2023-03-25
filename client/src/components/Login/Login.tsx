import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { validation } from "../../validation/validation";
import style from './Login.module.css'
import { RegistroApaUser } from "../RegistroApaUser/RegistroApaUser";



export const LoginApp = () => {
    type SignInData = {
        email: string;
        password: string;
    };

    const [signInData, setSignInData] = useState<SignInData>({
        email: "",
        password: "",
    });

    const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = ev.target;
        setSignInData({
            ...signInData,
            [name]: value,
        });
    };

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        axios
            .post("http://localhost:3001/api/auth/users/signIn", signInData)
            .then((response) => {
                setSignInData({
                    email: "",
                    password: "",
                });
                alert(response.data.message);
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    };

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const field = e.target.name;
        setTouched({
            ...touched,
            [field]: true
        });
    };

    const errorsInput = validation(signInData);

    const [showLogin, setShowLogin] = useState(true);


    const handleClickRegistro = () => {

        setShowLogin(false);
    };
    return (
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <>
                {showLogin && <div className={style.containerFormLogin}>
                    <form onSubmit={handleSubmit} className={style.formLogin}>
                        <h2>Bienvenidos</h2>
                        <label htmlFor="email" className={style.labelLogin}>Email</label>
                        <input
                            className={style.inputLogin}
                            type="email"
                            id="email"
                            name="email"
                            value={signInData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errorsInput.email && <p className={style.parrafosErrorsLogin}>{errorsInput.email}</p>}

                        <label htmlFor="password" className={style.labelLogin}>Password</label>
                        <input
                            className={style.inputLogin}
                            type="password"
                            id="password"
                            name="password"
                            value={signInData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errorsInput.password &&
                            <p className={style.parrafosErrorsLogin}>{errorsInput.passwordLogin}</p>}

                        <Link className={style.linkOlvidasteContraseña} to="/restore-password">¿Olvidaste tu contraseña?</Link>

                        <button className={style.buttonLogin} disabled={!signInData.email || !signInData.password}>Continuar</button>

                        <button type="button" onClick={handleClickRegistro}>¿No estas registrado?</button>
                    </form>
                </div>}

                {!showLogin && <RegistroApaUser setShowLogin={setShowLogin} />}
            </>


            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
        </div>
    );
}

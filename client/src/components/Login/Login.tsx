import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { validation } from "../../validation/validation";
import style from './Login.module.css'
import { RegistroApaUser } from "../RegistroApaUser/RegistroApaUser";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    type SignInData = {
        email: string;
        password: string;
        userType: "apa" | "user" | undefined;
    };
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState<SignInData>({
        email: "",
        password: "",
        userType: undefined
    });

    const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = ev.target;
        setSignInData({
            ...signInData,
            [name]: value,
        });
    };

    const handleUserTypeChange = (ev: ChangeEvent<HTMLInputElement>): void => {
        const userType = ev.target.value as SignInData["userType"];
        setSignInData({
            ...signInData,
            userType
        });
    };

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        axios
            .post("http://localhost:3001/auth/apa/user/login", signInData)
            .then((response) => {
                setSignInData({
                    email: "",
                    password: "",
                    userType: undefined
                });

                navigate("/home")
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
        <>
            {showLogin && <div className={style.containerFormLogin}>
                <form onSubmit={handleSubmit} className={style.formLogin}>
                    <h2 className={style.tituloRegistro}>Bienvenidos</h2>
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

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="userType"
                                value="apa"
                                checked={signInData.userType === "apa"}
                                onChange={handleUserTypeChange}
                            />
                            Apa
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="userType"
                                value="user"
                                checked={signInData.userType === "user"}
                                onChange={handleUserTypeChange}
                            />
                            User
                        </label>
                    </div>

                    <Link className={style.linkOlvidasteContraseña} to="/restore-password">¿Olvidaste tu contraseña?</Link>

                    <button className={style.buttonLogin} disabled={!signInData.email || !signInData.password}>Continuar</button>

                    <div className={style.linea}></div>

                    <button>Continuar con Google</button>

                    <div className={style.linea}></div>


                    <div className={style.buttonRegisterContainer}>
                        <p className={style.noRegister}>¿No estás registrado?</p>
                        <button className={style.buttonRegister} type="button" onClick={handleClickRegistro}>Registrate</button>
                    </div>

                </form>
            </div>}

            {!showLogin && <RegistroApaUser setShowLogin={setShowLogin} />}
        </>

    );
};
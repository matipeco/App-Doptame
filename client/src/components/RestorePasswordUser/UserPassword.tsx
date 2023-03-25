import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
const UserPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [forgotPassword, setForgotPassword] = useState(false);
    const [input, setInput] = useState({
        resetPasswordKey: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/api/auth/users/forgotPassword", { email })
            .then((response) => {
                alert("Se ha enviado un correo electrónico con una clave de restablecimiento.");
                setForgotPassword(true);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    const handleResetSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/api/auth/users/resetPassword", { resetPasswordKey: input.resetPasswordKey, password })
            .then((response) => {
                alert("La contraseña se ha restablecido correctamente.");
                navigate("/login");
            })
            .catch((error) => {
                alert(error.response.data.message);
            })

    };

    return (
        <div>
            <h2>Restablecer contraseña</h2>
            {forgotPassword ? (
                <form onSubmit={handleResetSubmit}>
                    <label htmlFor="resetPasswordKey">Clave de restablecimiento:</label>
                    <input type="text" id="resetPasswordKey" name="resetPasswordKey" value={input.resetPasswordKey} onChange={(e) => setInput({ ...input, resetPasswordKey: e.target.value })} />
                    <label htmlFor="password">Nueva contraseña:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Restablecer contraseña</button>
                </form>
            ) : (
                <form onSubmit={handleForgotSubmit}>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Enviar clave de restablecimiento</button>
                </form>
            )}
        </div>
    );
};

export default UserPassword;
import React, { useState, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Reducer } from "../../redux/store/store"// Importa el tipo de Reducer correspondiente
import { User } from "../../redux/types"
import { StateType } from '../../redux/reducer/reducer'


export const EditUser = () => {
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const user_id = logueados?.userFound?._id;
    const userDetalle: User = useSelector((state: StateType) => state.detailUser); // Corrige la declaración de userDetalle
    const [input, setInput] = useState(userDetalle);

    useEffect(() => {
        setInput(userDetalle);
    }, [userDetalle]);

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        axios
            .put(`http://localhost:3001/users/${user_id}`, input) // Agrega el objeto input como data a enviar en la petición
            .then((response) => {
                // console.log(response.data)

            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleInputChange}
                />
                <br />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};
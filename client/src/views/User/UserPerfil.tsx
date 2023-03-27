import React from 'react'
import { FunctionComponent } from 'react'
import { User } from "../../redux/types"

type Props = {
    usuario: User
}

const UserPerfil: FunctionComponent<Props> = ({ usuario }: Props) => {
    return (
        <div>
            <h1>{usuario.name}</h1>
            <h2>{usuario.email}</h2>
        </div>
    );
};

export default UserPerfil
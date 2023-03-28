import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux';
import { getUsers, getApas, deleteApa, deleteUser } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import { Table } from 'react-bootstrap';
import style from "../DashboardAdmin/DashboardAdmin.module.css"
import { useParams } from 'react-router-dom';
import { MouseEventHandler } from "react";

export const DashboardAdmin = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: Reducer) => state.allUsers);
    const apas = useSelector((state: Reducer) => state.allApas);




    useEffect(() => {
        dispatch(getApas() as any as AnyAction)
        dispatch(getUsers() as any as AnyAction) // Agregar esta línea para volver a cargar la lista de usuarios
    }, [dispatch])



    const handleDeleteUser = async (event: React.MouseEvent<HTMLButtonElement>) => {

        const id = event.currentTarget.value;

        dispatch(deleteUser(id) as any as AnyAction).then(() => dispatch(getUsers() as any as AnyAction))



    };


    const handleDeleteApa = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const id = event.currentTarget.value;
        dispatch(deleteApa(id) as any as AnyAction).then(() => dispatch(getApas() as any as AnyAction))
    };

    return (
        <div className={style.containerTablas}>

            <Table className={style.tableUser} striped bordered hover>
                <caption>Usuarios</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Google Id</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users?.map(user => (
                        <tr key={user._id}>
                            <td>{user?.name}</td>
                            <td>{user?._id}</td>
                            <td>{user?.email}</td>
                            <td>{user?.googleId}</td>
                            <td>
                                <button onClick={handleDeleteUser} value={user._id} >Eliminar </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Table className={style.tableUser} striped bordered hover>
                <caption>Apas</caption>
                <thead>
                    <tr>
                        <th>Nombre APA</th>
                        <th>Id</th>
                        <th>Email</th>

                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {apas && apas?.map(apa => (
                        <tr key={apa?._id}>
                            <td>{apa?.name}</td>
                            <td>{apa?._id}</td>
                            <td>{apa?.email}</td>

                            <td>
                                <button onClick={handleDeleteApa} value={apa._id} >Eliminar </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
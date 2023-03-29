import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Table, Space } from 'antd';
import { getUsers, getPets, getApas, deleteApa, deleteUser, deletePet } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import style from "../AdminDashboard/AdminDashboard.module.css"

export const DashboardAdmin = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: Reducer) => state.allUsers);
    const apas = useSelector((state: Reducer) => state.allApas);
    const pets = useSelector((state: Reducer) => state.allPets);

    useEffect(() => {
        dispatch(getApas() as any as AnyAction)
        dispatch(getUsers() as any as AnyAction)
        dispatch(getPets() as any as AnyAction)
    }, [dispatch])

    const handleDeleteUser = async (id: string) => {
        await dispatch(deleteUser(id) as any as AnyAction);
        dispatch(getUsers() as any as AnyAction);
    };

    const handleDeleteApa = async (id: string) => {
        await dispatch(deleteApa(id) as any as AnyAction);
        dispatch(getApas() as any as AnyAction);
    };

    const handleDeletePet = async (id: string) => {
        await dispatch(deletePet(id) as any as AnyAction);
        dispatch(getPets() as any as AnyAction);
    };

    const columnsUser = [
        {
            title: 'Nombres',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
        },
        {
            title: 'Nombre Usuario',
            dataIndex: 'username',
            key: 'username',
        },

        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Google Id',
            dataIndex: 'googleId',
            key: 'googleId',
        },
        {
            title: 'Eliminar',
            key: 'eliminar',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <button onClick={() => handleDeleteUser(record._id)}>Eliminar</button>
                </Space>
            ),
        },
    ];

    const columnsApa = [
        {
            title: 'Nombre APA',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Eliminar',
            key: 'eliminar',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <button onClick={() => handleDeleteApa(record._id)}>Eliminar</button>
                </Space>
            ),
        },
    ];
    const columnsPet = [
        {
            title: 'Nombre Mascota',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
        },
        {
            title: 'Tipo de Animal',
            dataIndex: 'type',
            key: 'type',
        },

        {
            title: 'Dueño',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Eliminar',
            key: 'eliminar',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <button onClick={() => handleDeletePet(record._id)}>Eliminar</button>
                </Space>
            ),
        },
    ];

    return (
        <div className={style.containerTable}>

            <h2 className={style.tituloTabla}>USUARIOS</h2>
            <Table className={style.tabla} columns={columnsUser} dataSource={users} />
            <h2 className={style.tituloTabla}>ASOCIACIONES PROTECTORAS DE ANIMALES</h2>
            <Table className={style.tabla} columns={columnsApa} dataSource={apas} />
            <h2 className={style.tituloTabla}>MASCOTAS</h2>
            <Table className={style.tabla} columns={columnsPet} dataSource={pets} />
        </div>
    );
};

export default DashboardAdmin;

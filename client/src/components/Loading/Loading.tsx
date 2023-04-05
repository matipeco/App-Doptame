import React from 'react';
import style from '../Loading/Loading.module.css'; // assuming you are using CSS modules for styles

export const Loading = () => {
    return (
        <div>
            <span className={style.loader}></span>
        </div>
    );
}
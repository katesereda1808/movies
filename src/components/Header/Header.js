import React, { Component } from 'react';
import s from './Header.module.css';

class Header extends Component {
    render() { 
        return (
            <header className={s.header}>
                <h1 className={s.header__tittle}>
                    Movies
                </h1>
            </header>
        );
    }
}
 
export {Header};
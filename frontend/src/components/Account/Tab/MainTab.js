import React from 'react';

export function MainTab(props) {
    const { first_name, last_name } = props.user;

    return (
        <div>
            <p>Nome: {first_name}</p>
            <p>Cognome: {last_name}</p>
        </div>
    )
}
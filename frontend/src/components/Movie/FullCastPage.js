import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Importing Actions
import { loadMovie } from '../../redux/actions/movie.action';

import { ListPeople } from './ListPeople';

function FullCastPage() {

    let { id } = useParams();

    const actors = useSelector(state => state.movie.movie.actors) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        if (actors.length === 0)
            dispatch(loadMovie(id));
    }, [dispatch, id, actors.length]);

    return (
        <div>
            <h3>Cast completo</h3>
            <ListPeople list={actors} />
        </div>
    )
}

export default FullCastPage;
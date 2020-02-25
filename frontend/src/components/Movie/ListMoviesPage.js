import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import Actions
import { movieAction } from '../../redux/actions/main.action';

// Importing custom components
import { ListMovies } from './ListMovies';

export function ListMoviePage() {

    let { type } = useParams();
    const dispatch = useDispatch();

    let popular = useSelector(state => state.main.popularMovies);
    let rated = useSelector(state => state.main.topRankedMovies);

    useEffect(() => {
        dispatch(movieAction.getListMovies(type));
    }, [type, dispatch]);

    return (
        <div>
            {type === 'popular' ?
                <ListMovies movies={popular} title='I film più popolari' />
                :
                <ListMovies movies={rated} title='I film più votati' />
            }
        </div>
    )
}
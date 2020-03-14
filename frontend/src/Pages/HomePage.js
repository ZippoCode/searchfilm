import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { movieAction } from '../redux/actions/main.action';

// Importing custom components
import CarouselMovie from './components/CarouselMovie';
import SearchMovie from './components/SearchMovie';
import SearchBarMovie from './components/SearchBarMovie';

export function HomePage() {

    const dispatch = useDispatch();
    const loadedPopular = useSelector(state => state.main.loadedPopular) || false;
    const popularMovies = useSelector(state => state.main.popularMovies) || [];
    
    useEffect(() => {
        const loadPopularMovies = () => { dispatch(movieAction.getListMovies('popular')); }
        if (!loadedPopular)
            loadPopularMovies();
  
    }, [dispatch, loadedPopular]);

    return (
        <div>
            <SearchMovie />
            <SearchBarMovie />
            <CarouselMovie movies={popularMovies} />
        </div>
    );
}
import React, { useEffect } from 'react';
import axios from 'axios';

// Importing custom components
import CarouselMovie from './components/CarouselMovie';
import SearchMovie from './components/SearchMovie';
import SearchBarMovie from './components/SearchBarMovie';

import * as URL from '../helpers/matcher';

export function HomePage() {

    const [popular, setPopular] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL.TOPPOPULAR)
                setPopular(response.data.results)
            } catch (error) { console.log(error) }
        }
        if (popular.length === 0)
            fetchData();
    }, [popular, setPopular]);

    return (
        <div>
            <SearchMovie />
            <SearchBarMovie />
            <CarouselMovie movies={popular} />
        </div>
    );
}
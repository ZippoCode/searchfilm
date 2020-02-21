import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Importing from Material-UI
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

// Import Styled-Component
import styled from 'styled-components';

const SearchBar = styled.input`
    width: 32px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-position: 10px 10px; 
    background-image: url('https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/search-16.png');
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  
  :focus {
    width: 100%;
  }
`;

export function SearchMovieBar() {
    const [query, setQuery] = useState('');

    const [suggestedMovies, setSuggestedMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false)
            anchorRef.current.focus();

        prevOpen.current = open;
    }, [open])

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    }

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target))
            return;
        setSuggestedMovies([]);
        setOpen(false);
    }

    const handleChange = event => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        const getMovies = () => {
            fetch(`http://127.0.0.1:8000/movie/api/title/?search=${query}`)
                .then(response => response.json())
                .then(movies => setSuggestedMovies(movies));
        }
        if (query && query.length > 1 && query.length % 2 === 0)
            getMovies();
    }, [query])

    return (
        <div>
            <form id='search-movie'>
                <SearchBar
                    aria-controls={open ? 'search-bar-suggested' : undefined}
                    type='search'
                    placeholder='Ricerca un film...'
                    onChange={handleChange}
                    onClick={handleToggle}
                    ref={anchorRef}
                />
            </form>
            <Popper open={open} anchorEl={anchorRef.current}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id='search-bar-suggested'>
                            {suggestedMovies.map((movie, index) => (
                                <MenuItem
                                    component={Link}
                                    to={`/movie/${movie.id}`}
                                    onClick={handleClose}
                                    key={index}
                                >
                                    {movie.title}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    )
}

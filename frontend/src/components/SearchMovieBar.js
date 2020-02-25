import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Constants
import * as URL from '../helpers/matcher';

// Importing from Material-UI
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

// Import Styled-Component
import styled from 'styled-components';

const InputStyled = styled.input`
    width: 32px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-position: 10px 10px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  
  :focus {
    width: 100%;
  }
`;

export function SearchMovieBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [query, setQuery] = useState('');
    const [suggestedMovies, setSuggestedMovies] = useState([]);

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleClose = () => { setAnchorEl(null); }

    useEffect(() => {
        const getMovies = () => {
            fetch(URL.SEARCHMOVIEBYTITLE.concat(query))
                .then(response => response.json())
                .then(movies => setSuggestedMovies(movies))
                .catch(error => console.log(error));
        }
        if (query && query.length > 1 && query.length % 2 === 0)
            getMovies();
    }, [query]);

    return (
        <div>
            <InputStyled
                type='text'
                onClick={handleClick}
                onChange={event => setQuery(event.target.value)}
            />
            <Popper id='search-movie-bar' open={open} anchorEl={anchorEl}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                            {suggestedMovies.map((movie, index) => {
                                if (index < 5)
                                    return <MenuItem
                                        key={index}
                                        component={Link}
                                        to={`/movie/${movie.id}`}
                                        onClick={handleClose}
                                    >
                                        {movie.title}
                                    </MenuItem>
                                else
                                    return null;
                            })}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    )
    /*
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

        }, [query])
    */

    /*
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
 
)
                        */
}

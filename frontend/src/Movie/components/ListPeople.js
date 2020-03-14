import React from 'react';
import PropTypes from 'prop-types';

// Importing style from Material-UI
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        '& .MuiTypography-colorTextSecondary': {
            color: theme.palette.primary.dark,
            fontWeight: 'normal',
        },
    },
}));

const ListPeople = ({ list }) => {
    const classes = useStyles();

    return (
        <List>
            {list.map((actor, index) =>
                <ListItem
                    key={index}
                    component={Link}
                    href={`/person/${actor.id}`}
                    underline='none'
                    className={classes.root}
                >
                    <ListItemIcon>
                        <Avatar
                            variant='rounded'
                            alt={actor.name}
                            src={actor.profile_img ? `https://image.tmdb.org/t/p/w500/${actor.profile_img}` : ''}
                        >
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText
                        primary={actor.name}
                        secondary={actor.name_character ? `${actor.name_character}` : null}
                    />
                </ListItem>
            )}
        </List>
    )
}

ListPeople.propTypes = {
    list: PropTypes.array.isRequired,
}

export default ListPeople;
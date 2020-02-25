import React from 'react';
import { Link } from 'react-router-dom';

// Importing style from Material-UI
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const ListPeople = ({ list, num = list.length }) => (
    <List>
        {list.map(function (actor, index) {
            if (index < num)
                return <ListItem
                    key={index}
                    component={Link}
                    to={`/person/${actor.id}`}
                >
                    <ListItemIcon>
                        <Avatar
                            variant='rounded'
                            alt={actor.name}
                            src={`https://image.tmdb.org/t/p/w500/${actor.profile_img}`}
                        >
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText
                        primary={actor.name}
                        secondary={actor.name_character ? `${actor.name_character}` : null}
                    />
                </ListItem>
            else
                return null;
        })}
    </List>
)
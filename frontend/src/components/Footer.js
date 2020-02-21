import React from 'react';

// Importing from Material-UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

// Importing Styled-Components
import styled from 'styled-components';


const Footer = styled.footer`
    flex-shrink: 0;
    padding: 20px 10px 20px 10px;
`;

export function FooterCustom() {
    return (
        <Footer>
            <Divider />
            <Grid container>
                <p>Search Movie, 2020</p>
            </Grid>
        </Footer>
    )
}

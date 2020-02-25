import React from 'react';

// Importing from Material-UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

// Icons
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';

// Importing Styled-Components
import styled from 'styled-components';

const Footer = styled.footer`
    flex-shrink: 0;
    padding: 20px 10px 20px 10px;
    text-align: start;

    p{
        margin:0px;
        margin-bottom: 8px;
    }
    
    p.social{
        padding-right: 4px;
    }
`;

export function FooterCustom() {
    return (
        <div>
            <Divider />
            <Footer>
                <Grid container justify='space-around'>
                    <Grid item>
                        <p>Search Movie, 2020 ©</p>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column'>
                            <Grid item>
                                <Grid container>
                                    <p className='social'>Facebook</p>
                                    <Facebook fontSize='small' />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <p className='social'>Instagram</p>
                                    <Instagram fontSize='small' />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <p className='social'>Twitter</p>
                                    <Twitter fontSize='small' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column'>
                            <p>Chi siamo</p>
                            <p>Contatti</p>
                            <p>Privacy Policy</p>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column'>
                            <p>Help</p>
                            <p>FAQs</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Footer>
        </div >
    )
}

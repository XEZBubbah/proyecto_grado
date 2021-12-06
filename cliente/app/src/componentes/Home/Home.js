import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

const Home = () => {
    return (   
        <Grow in>
            <Container>
                <Grid container justify="space-between" alingItems="stretch" spacing={3}>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styled from 'styled-components'

const Copyright = styled.div`
    margin-top: 20px;
`

export default () => (
    <Copyright>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Shipment Tracker
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    </Copyright>
)
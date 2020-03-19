import React from 'react';
import C from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import styled from 'styled-components'

import ShipmentTable from './components/ShipmentTable/DataWrapper'
import Copyright from './components/Copyright.js'

const Container = styled(C)`
  min-height: 100vh;
  padding: 2.5%;
`


export default () => (
  <Container maxWidth={false}>
    <Typography variant="h4" component="h1" gutterBottom>
      Shipment Tracker
      </Typography>
    <Card>
      <ShipmentTable />
    </Card>
    <Copyright />
  </Container>
)
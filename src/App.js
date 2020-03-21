import React from 'react';
import C from '@material-ui/core/Container';
import styled from 'styled-components'

import ShipmentTable from './components/ShipmentTable/DataWrapper'
import Copyright from './components/Copyright.js'

const Container = styled(C)`
  min-height: 100vh;
  padding: 2.5%;
`


export default () => (
  <Container maxWidth={false}>
    <ShipmentTable />
    <Copyright />
  </Container>
)
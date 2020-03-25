import React, { useState } from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-content: center;
    > * {
        margin-right: 10px;
    }
`
const Clear = styled(Link)`
    opacity: ${props => props.active ? `100` : `0`};
    align-self: center;
    :hover {
        cursor: ${props => props.active ? `pointer` : 'default'};
    }
`

export default (props) => {
    const [searchValue, handleSearch] = useState('')
    return (
        <Wrapper>
            <TextField
                onKeyDown={
                    (e) => {
                        if (e.keyCode === 13) {
                            console.log('value', e.target.value);
                            props.search(searchValue)
                        }
                    }
                }
                onChange={(e) => handleSearch(e.target.value)}
                value={searchValue}
                id="table-search"
                label="Search by Shipment ID"
                variant="outlined"
            />
            <Button variant="contained" color="primary" disabled={!searchValue} onClick={() => props.search(searchValue)}>
                Search
            </Button>
            <Clear onClick={() => {
                if (searchValue) {
                    handleSearch('')
                }
                props.search('')
            }} active={searchValue} color="error">Clear</Clear>
        </Wrapper >
    )
}
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import $ from 'jquery'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Editor from './Editor'

const Wrapper = styled(Paper)`
    padding: 20px;
`

export default ({ id, ...props }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getPageData()
        return () => null
    }, [])

    const getPageData = () => {
        const url = process.env.REACT_APP_SHIPMENT_TABLE
        const searchUrl = `${url}/${id}`
        $.get(searchUrl)
            .then(result => {
                setData(result)
            })
    }

    return (
        <Wrapper>
            <Typography variant="h4" component="h1">
                Shipment info for {id}
            </Typography>
            {data && Object.keys(data).map(item => (
                <Editor key={`${item}-editor`} id={id} {...props} column={item} item={data[item]} />
            ))}
            <Button onClick={() => props.setSinglePageId('')} variant="contained" color="primary">
                Back
            </Button>
        </Wrapper>
    )
}
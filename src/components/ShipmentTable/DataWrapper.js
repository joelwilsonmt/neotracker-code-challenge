import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import CircularProgress from '@material-ui/core/CircularProgress';
import ShipmentTableWrapper from './ShipmentTableWrapper'
export default () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    const url = process.env.REACT_APP_SHIPMENT_TABLE
    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        $.get(`${url}`)
            .then((result) => {
                setData(result)
                setLoading(false)
            })
    }

    const edit = (id, key, replacement, singleEdit = false) => {
        const searchUrl = `${url}/${id}`
        $.get(searchUrl)
            .then(result => {
                result[key] = replacement
                const property = { [key]: replacement }
                $.ajax({
                    url: searchUrl,
                    dataType: 'json',
                    method: 'PATCH',
                    data: property
                })
                    .then(success => {
                        if (!singleEdit) {
                            getData()
                        }
                        return success
                    })
            })
    }

    const editOne = (id, key, replacement) => edit(id, key, replacement, true)

    return (
        loading ? <CircularProgress key="loading-data" /> : <ShipmentTableWrapper key="table-wrapper" editOne={editOne} edit={edit} data={data} />
    )
}
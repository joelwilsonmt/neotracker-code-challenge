import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import CircularProgress from '@material-ui/core/CircularProgress';
import ShipmentTable from './ShipmentTable'

export default () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        $.get(process.env.REACT_APP_GET_SHIPMENTS)
            .then(result => {
                setData(result)
                setLoading(false)
            })
    }, [])
    return (
        loading ? <CircularProgress /> : <ShipmentTable data={data} />
    )
}
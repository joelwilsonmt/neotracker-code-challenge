import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cancel from '@material-ui/icons/Cancel';
import _ from 'lodash'
import styled from 'styled-components'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Control = styled(FormControl)`
    width: 8vw;
    margin-right: 20px;
    @media screen and (max-width: 992px) {
        width: 20vw;
    }
    @media screen and (max-width: 576px) {
        width: 25vw;
    }
    @media screen and (max-width: 425px) {
        width: 40vw;
        margin: 5px;
    }
`
const CancelIcon = styled(Cancel)`
    position: absolute;
    top: 0px;
    right: -10px;
    :hover{
        cursor: pointer;
    }
`

export default ({ category, options, filter }) => {
    const [selected, setSelected] = useState([])

    const handleChange = event => {
        setSelected(event.target.value)
    }
    useEffect(() => {
        filter(category, selected)
    }, [selected])


    // TODO: add support for deep array filtering (cargo and services)
    return (
        typeof options[0] !== "object" ?
            <Control>
                <InputLabel id={category}>{_.startCase(category)}</InputLabel>
                <Select
                    labelId={category}
                    id={`select-${category}`}
                    multiple={options.length > 1}
                    value={selected}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {options.map(option => (
                        <MenuItem value={option} key={option} >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {
                    selected.length > 0 ? <CancelIcon onClick={() => {
                        setSelected([])
                        filter(category, [])
                    }} /> : null
                }
            </Control>
            : null
    )
}
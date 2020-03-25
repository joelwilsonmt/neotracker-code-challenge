import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

const Editor = styled.div`
    display: flex;
    align-items: center;
    > * {
        align-items: center;
        align-self: center;
        margin-right: 10px;
    }
    min-height: 62px;
`
const Category = styled.div`
    min-width: 150px;
`

export default ({ id, column, editOne, ...props }) => {
    const [item, setItem] = useState(props.item)
    const [editing, enableEditing] = useState(false)
    const [input, handleInput] = useState('')
    const handleEditSubmission = () => {
        editOne(id, column, input)
        enableEditing(false)
        setItem(input)
    }
    return (
        <Editor>
            <Category>
                <Typography display="inline"><strong>{_.upperFirst(column)}:{` `}</strong> </Typography>
            </Category>
            {editing ?
                <TextField
                    onChange={(e) => handleInput(e.target.value)}
                    autoFocus
                    onFocus={(event) => {
                        event.target.setSelectionRange(0, event.target.value.length);
                    }}
                    id={`${item}`}
                    label={`${item.slice(0, 8)}...`}
                    value={input || item}
                    variant="outlined"
                />
                :
                typeof item !== "object" ?
                    <Typography display="inline">{item}</Typography>
                    : <Typography display="inline">Object Here</Typography>}
            {` `}
            {editing ?
                <>
                    <Link
                        component="button"
                        color="primary"
                        onClick={() => handleEditSubmission()}
                    >
                        Submit Change
                </Link>
                    {`    `}
                    <Link
                        component="button"
                        color="secondary"
                        onClick={() => enableEditing(false)}
                    >
                        Cancel
                </Link>
                </>
                :
                <Link
                    component="button"
                    color="primary"
                    onClick={() => enableEditing(true)}
                >
                    Edit
            </Link>
            }
        </Editor>
    )
}
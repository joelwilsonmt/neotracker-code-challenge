import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import MUITableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Editor from "./Editor.js"

const TableRow = styled(MUITableRow)`
    ${props => props.index % 2 === 0 ?
        `background-color: #689f38;
        * {
            color: #fff;
        }`
        :
        `*{color: #333;
            button * {
                color: #fff;
            }
        }`}
    :hover {
        cursor: pointer;
    }
`
const HoverDetails = styled.div`
    padding: 10px;
`
const SubRow = styled(MUITableRow)`
  padding: 0 !important;
`
const CollapseInner = styled.div`
    padding: 50px;
`
// 

export default ({ rowData, columns, index, ...props }) => {
    const [expanded, expand] = useState(false)

    return [
        <TableRow index={index} key={`${rowData.name}`} onClick={() => expand(!expanded)} key={rowData.name}>
            {columns.map((column, columnIndex) => {
                return (
                    typeof rowData[column] === "object" ?
                        <TableCell key={`${column}-header-cell`}>
                            <Tooltip
                                arrow
                                placement={'top'}
                                title={rowData[column].map((item, index) => (
                                    <HoverDetails key={`${index}-tooltip`}>
                                        {Object.keys(item).map(key => (
                                            <Typography key={`${key}-value`} variant="body2" align="center">
                                                {_.upperFirst(key)}: {item[key]}
                                            </Typography>
                                        ))}
                                    </HoverDetails>
                                ))}
                            >
                                <Link
                                    color="primary"
                                    component="button"
                                >
                                    {_.upperFirst(column)} Info
                                         </Link>
                            </Tooltip>
                        </TableCell>
                        :
                        <TableCell key={`${column}-header-cell`}>{rowData[column]}</TableCell>
                )
            })}
        </TableRow>,
        <SubRow key={`${rowData.name}-expansion`} className="subrow">
            <TableCell padding="none" colSpan={columns.length}>
                <Collapse in={expanded} timeout="auto" unmountOnExit={false}>
                    <CollapseInner>
                        {columns.map(column => (
                            <Editor key={`${rowData.id}-${column}-expanded`} id={rowData.id} {...props} column={column} item={rowData[column]} />
                        ))}
                        <Button onClick={() => props.setSinglePageId(rowData.id)} variant="contained" color="primary">
                            View/Edit
                        </Button>
                    </CollapseInner>
                </Collapse>
            </TableCell>
        </SubRow>
    ]
}
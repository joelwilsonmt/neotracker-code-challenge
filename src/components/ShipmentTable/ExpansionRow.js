import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import MUITableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

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
const ShippingItem = styled.div`
    border: 1px solid #333;
    padding: 10px;
`

export default ({ rowData, columns, index }) => {
    const [expanded, expand] = useState(false)
    return [
        <TableRow index={index} key={`${rowData.name}`} onClick={() => expand(!expanded)} key={rowData.name}>
            {columns.map((column, columnIndex) => {
                return [
                    <>
                        {typeof rowData[column] === "object" ?
                            <TableCell>
                                <Tooltip
                                    arrow
                                    placement={'top'}
                                    title={rowData[column].map((item, index) => (
                                        <HoverDetails>
                                            {Object.keys(item).map(key => (
                                                <Typography variant="body2" color="white" align="center">{_.upperFirst(key)}: {item[key]}</Typography>
                                            ))}
                                        </HoverDetails>
                                    ))}
                                >
                                    <Button
                                        contained
                                        variant="contained"
                                        color="primary"
                                    >
                                        {_.upperFirst(column)} Info
                                         </Button>
                                </Tooltip>
                            </TableCell>
                            :
                            <TableCell>{rowData[column]}</TableCell>}

                    </>
                ]
            })}
        </TableRow>,
        <SubRow key={`${rowData.name}-expansion`} className="subrow">
            <TableCell padding="none" colSpan={columns.length}>
                <Collapse in={expanded} timeout="auto" unmountOnExit={false}>
                    <CollapseInner>
                        <ul>
                            {columns.map(column => (
                                <li><strong>{column}:</strong> {typeof rowData[column] !== "object" ? rowData[column] : 'expand'}</li>
                            ))}
                        </ul>
                    </CollapseInner>
                </Collapse>
            </TableCell>
        </SubRow>
    ]
}
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import _ from 'lodash'

import ExpansionRow from './ExpansionRow'

// in the future, use this: https://material-table.com/#/

export default ({ rowsPerPage, setRowsPerPage, data, setPage, sort, sortBy, page, ...props }) => {
    const rows = data
    const columns = Object.keys(rows[0])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10)) //10 radix 
    };

    let rowsPerPageOptions = [5, 10, 20, 50, 100, 1000]
    rowsPerPageOptions = rowsPerPageOptions.filter(option => option <= data.length)
    return (
        <TableContainer component={Paper}>
            <Table aria-label="shipment table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => {
                            const isObject = typeof rows[0][column] === "object"
                            return (
                                <TableCell key={`${column}-header`} onClick={() => isObject ? null : sort(column)}>
                                    {isObject ? _.startCase(column) :
                                        <TableSortLabel
                                            active={sortBy === column}
                                            direction={props.sortAscending ? 'asc' : 'desc'}
                                        >
                                            {_.startCase(column)}
                                        </TableSortLabel>}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows).map((row, index) => (
                            <ExpansionRow
                                key={row.id}
                                editOne={props.editOne}
                                edit={props.edit}
                                index={index}
                                rowData={row}
                                columns={columns}
                                {...props}
                            />
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[...rowsPerPageOptions, { label: 'All', value: -1 }]}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
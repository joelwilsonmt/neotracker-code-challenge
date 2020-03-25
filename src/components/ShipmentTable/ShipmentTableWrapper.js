import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import deepmerge from 'deepmerge'

import Typography from '@material-ui/core/Typography';


import ShipmentTable from './ShipmentTable'
import ButtonGroup from './ButtonGroup'
import Filter from './Filter'
import Search from './Search'
import SinglePage from './SinglePage'


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .button-container {
    margin-top: 5px;
  }
`
const FilterWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
`



export default ({ data, ...props }) => {
  const [filteredData, setData] = useState(data)
  const [page, setPage] = useState(0)
  const [sortAscending, setSortAscending] = useState(true)
  const [sortBy, setSortBy] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [singlePage, setSinglePageId] = useState(null)


  //search by id:
  const search = (val) => {
    const searchTerm = val
    const newData = _.filter(data, (item) => item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
    setData(newData)
    setPage(0)
    let rowsPerPageOptions = [5, 10, 20, 50, 100, 1000]
    rowsPerPageOptions = rowsPerPageOptions.filter(option => option <= newData.length)
    setRowsPerPage(rowsPerPageOptions[rowsPerPageOptions.length - 1] || newData.length)
  }

  // sort by column:
  const sort = (column) => {
    const newData = _.orderBy(filteredData, column, [sortAscending ? 'asc' : 'desc', sortAscending ? 'desc' : 'asc'])
    setSortAscending(!sortAscending)
    setData(newData)
    setSortBy(column)
  }

  //filter by value in a category:
  const filter = (category, value) => {
    if (value.length > 0) {
      const newData = _.filter(data, item => {
        console.log("index of item?", value.indexOf(item[category]))
        return value.indexOf(item[category]) >= 0
      })
      console.log("new data in filter before set", newData)
      setData(newData)
    }
    else {
      setData(data)
    }
  }

  const makeOptionsTree = (objList) => {
    return _.mapValues(objList[0], (value, key) => {
      let result = _.uniq(_.map(objList, key))
      return result
    })
  }

  const paginationProps = { sortAscending, rowsPerPage, setRowsPerPage, setPage, sortBy, sort, page, data: filteredData, pageLength: _.chunk(filteredData, rowsPerPage).length }
  const columns = Object.keys(data[0])
  const optionsObj = makeOptionsTree(data) //memoize?

  // console.log("options tree", optionsObj)
  // // optionsObj.cargo = makeOptionsTree(optionsObj.cargo, true)
  // console.log("filter options after option tree", makeOptionsTree(optionsObj.cargo))


  return [
    <Header key="page-header">
      <Typography variant="h4" component="h1" gutterBottom>
        Shipment Tracker
      </Typography>
      {singlePage ? null : <Search search={search} />}
      {singlePage ? null : <ButtonGroup {...paginationProps} />}
    </Header>,
    <FilterWrapper key="filter-options">
      {!singlePage && columns.map(cat => (
        <Filter key={`${cat}-filter`} filter={filter} category={cat} options={optionsObj[cat]} />
      ))}
    </FilterWrapper>,
    filteredData.length === 0 ? null :
      singlePage ?
        <SinglePage editOne={props.editOne} setSinglePageId={setSinglePageId} id={singlePage}>Single page here!</SinglePage>
        :
        <ShipmentTable key="shipment-table" setSinglePageId={setSinglePageId} {...props} {...paginationProps} />,
    singlePage ? null : <ButtonGroup key="button-pagination" {...paginationProps} />
  ]
}
import React, { useState } from 'react'
import { Box, Grid } from '@chakra-ui/core'
import { TRow } from './Components/TRow'
import { THead } from './Components/THead'
import { TableLoader } from './Loaders/TableLoader'
import { useSelectionTable } from './Hooks/useSelectionTable'
import { noDataItem } from './styles'
import PropTypes from "prop-types";
import * as _ from "lodash";

export const Table = ({  sort, noDataComponent, localPaginate, list = [], actions = [], leftActions = [], head, selection, page, limit, selected = [], setSelected, setSelectedRows, selectedRows, loading, collapse, noBorder, striped, hovered }) => {

  const [showCollapse, setShowCollapse] = useState('')

  const [sortBy, setSortBy] = useState('_id')
  const [orderBy, setOrderBy] = useState('desc')
  const toPaginateList = localPaginate ? list.slice(limit * (page - 1), limit * page) : list
  const rows = sort ? _.orderBy(toPaginateList,sortBy,orderBy) : toPaginateList
  const [
    allChecked,
    isIndeterminate,
    changeSelected,
    changeSelectedAll
  ] = useSelectionTable(rows, localPaginate, page, limit, selected, setSelected, setSelectedRows)
  const propsDefault = {
    columns: head,
    collapse,
    actions,
    selection,
    leftActions
  }

  const noDataDefault = <Grid {...noDataItem}>
    NO DATA
  </Grid>

  return <Box borderWidth={noBorder ? '0' : '1px'} rounded='md'>
    {/*table head*/}
    <THead
      {...propsDefault}
      changeSelectedAll={changeSelectedAll}
      allChecked={allChecked}
      isIndeterminate={isIndeterminate}
      loading={loading}
      sortBy={sortBy}
      setSortBy={setSortBy}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      sort={sort}
    />
    {/*table row*/}
    {!loading && rows.map((row, index) =>
      <TRow
        {...propsDefault}
        key={index}
        index={index}
        countRows={rows.length}
        hovered={hovered}
        showCollapse={showCollapse}
        setShowCollapse={setShowCollapse}
        changeSelected={changeSelected}
        striped={striped}
        selected={selected}
        row={row}/>
    )}
    {/*table loader*/}
    {loading &&
    <TableLoader
      columns={head}
      countRows={limit}
      selection={selection}
      actions={actions}
      leftActions={leftActions}
      collapse={collapse}/>}
    {/*no data*/}
    {(!loading && !rows.length) && (noDataComponent || noDataDefault)}
  </Box>
};

Table.propTypes = {
  sortBy:PropTypes.string,
  setSortBy:PropTypes.func,
  orderBy:PropTypes.string,
  setOrderBy:PropTypes.func,
  sort:PropTypes.bool,
  noDataComponent:PropTypes.any,
  localPaginate:PropTypes.bool,
  list:PropTypes.array,
  actions:PropTypes.array,
  leftActions:PropTypes.array,
  head:PropTypes.array,
  selection:PropTypes.bool,
  page:PropTypes.number,
  limit:PropTypes.number,
  selected:PropTypes.bool,
  setSelected:PropTypes.array,
  setSelectedRows:PropTypes.func,
  selectedRows:PropTypes.array,
  loading:PropTypes.bool,
  collapse:PropTypes.any,
  noBorder:PropTypes.bool,
  striped:PropTypes.bool,
  hovered:PropTypes.bool
};


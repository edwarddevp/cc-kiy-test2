import React, {Fragment} from 'react'
import { Box, Checkbox, PseudoBox, Text } from '@chakra-ui/core'
import { RowActions } from './RowActions'
import { getValue } from '../../Helpers/getValue'
import { isStriped } from '../../Helpers/isStriped'
import { RowCollapse } from './RowCollapse'

export const TRow = props => {
  const {
    columns,
    countRows,
    index,
    row,
    actions,
    leftActions,
    collapse,
    selection,
    showCollapse,
    setShowCollapse,
    changeSelected,
    selected,
    striped,
    hovered
  } = props

  return <Fragment><PseudoBox
    d={{ sm: 'ruby', md: 'ruby', lg: 'grid', xl: 'grid' }}
    bg={isStriped(striped, index)}
    _hover={hovered && { bg: '#f0f0f0' }}
    cursor={hovered && 'pointer'}
    gridTemplateColumns={`auto auto repeat(${columns.length}, 1fr) auto`}
    borderBottomWidth={countRows === index + 1 ? '0' : '1px'}>
    {selection ?
      <Checkbox
        px={4}
        size='lg'
        isChecked={selected.includes(row._id || row.id)}
        onChange={(e) => changeSelected(row)}
      /> : <Box/>}
    {leftActions.length || collapse ?
      <RowActions
        direction='left'
        actions={leftActions}
        row={row}
        collapse={collapse}
        showCollapse={showCollapse}
        setShowCollapse={setShowCollapse}/> :
      <Box/>
    }
    {columns.map((column, index) => <Box key={index} p={2} isTruncated>
      <Box isInline>
        <Text display={{ sm: 'block', md: 'block', lg: 'none', xl: 'none' }}><b>{column.field || column}:</b> </Text>{getValue(column, row)}
      </Box>
    </Box>)}
    {actions.length ? <RowActions actions={actions} row={row}/> : <Box/>}
  </PseudoBox>
    {collapse && <RowCollapse collapse={collapse} row={row} showCollapse={showCollapse}/>}
    </Fragment>
}

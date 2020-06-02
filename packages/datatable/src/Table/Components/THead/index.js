import React from 'react'
import { Box, Checkbox, Grid, Skeleton, Text, Icon } from '@chakra-ui/core'
import { checkItem, headActionItem, headItem } from '../../styles'

export const THead = props => {
  const {
    columns,
    actions,
    leftActions,
    collapse,
    selection,
    allChecked,
    isIndeterminate,
    changeSelectedAll,
    loading,
    sort,
    sortBy,
    setSortBy,
    orderBy,
    setOrderBy
  } = props
  const widthActions = (numberItems) => {return (29 * numberItems) + 12}
  const leftActionLength = collapse ? leftActions.length + 1 : leftActions.length
  const onChangeCheck = (e) => {
    changeSelectedAll(e.target.checked)
  }
  const onClickOrder = () => {
    setOrderBy(orderBy === 'asc' ? 'desc' : 'asc')
  }

  return <Grid
    display={{ sm: 'none', md: 'none', lg: 'grid', xl: 'grid' }}
    templateColumns={`auto auto repeat(${columns.length}, 1fr) auto`}
    borderBottomWidth='1px'>
    {/*check del row*/}
    {selection ?
      loading ?
        <Grid alignContent='center' px={4} children={<Skeleton w='20px' h='20px'/>}/> :
        <Checkbox
          {...checkItem}
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => {onChangeCheck(e)}}
        /> :
      <Box/>
    }
    {/*left actions and collapse*/}
    {leftActions.length || collapse ?
      <Box
        {...headItem}
        {...headActionItem}
        w={`${widthActions(leftActionLength)}px`}/> :
      <Box/>
    }
    {/*columns*/}
    {columns.map((column, index) =>
      <Box

        onClick={() => {sort && setSortBy(column.field || column);}}
        {...headItem}
        key={index}>
        {column.label || <Text textTransform='capitalize'>{column}</Text>}
        {sort &&
        sortBy === (column.field || column) &&
        <Box zIndex={99999} cursor='pointer' onClick={onClickOrder}>
          <Icon name={orderBy === 'asc' ? 'chevron-down' : 'chevron-up'}/>
        </Box>}
      </Box>)}
    {/*actions*/}
    {actions.length ?
      <Box
        {...headItem}
        {...headActionItem}
        w={`${widthActions(actions.length)}px`}/> :
      <Box/>
    }
  </Grid>
}

import React from 'react'
import { Box, Grid, Skeleton } from '@chakra-ui/core'
import { RowActionsLoader } from './RowActionsLoader'

export const TRowLoader = ({columns, index, countRows, selection, leftActions, actions, collapse}) => {

  return <Grid
    templateColumns={`auto auto repeat(${columns.length}, 1fr) auto`}
    borderBottomWidth={countRows === index + 1 ? '0' : '1px'}>
    {selection ?
      <Grid alignContent='center' px={4}><Skeleton w='20px' h='20px'/></Grid> : <Box/>
    }
    {leftActions.length || collapse ?
      <RowActionsLoader collapse={collapse} actions={leftActions} /> : <Box/>
    }
    {columns.map((column, index) => <Box key={index} p={3}>
      <Skeleton rounded={'lg'} h='18px'/>
    </Box>)}
    {actions ?
      <RowActionsLoader actions={actions} /> : <Box/>}
  </Grid>
};
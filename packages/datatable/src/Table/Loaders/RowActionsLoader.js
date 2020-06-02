import React from 'react'
import { Grid, Skeleton } from '@chakra-ui/core'

export const RowActionsLoader = ({actions, collapse}) => {

  if (!actions.length && collapse) {
    actions.push({label:'0'})
  }

  if (actions.length && collapse) {
    actions = [...actions, {label:'0'}]
  }

  return <Grid minW='100px' p={3} gap={1} templateColumns={`repeat(${actions.length}, 1fr)`}>
    {actions.map((_, index) => <Skeleton key={index} w='25px' rounded={'lg'} h='17px'/> )}
  </Grid>
};
import React from 'react'
import { pseudoTag } from '../styles'
import { Box, Icon, Text } from '@chakra-ui/core'

export const PseudoTag = ({item, addOrRemove}) => {

  return <Box {...pseudoTag}>
    <Text isTruncated>{item?.label}</Text>
    <Icon name='close' size='8px' cursor='pointer' onClick={() => {
      addOrRemove({type: 'remove', value: item})
    }}/>
  </Box>
};
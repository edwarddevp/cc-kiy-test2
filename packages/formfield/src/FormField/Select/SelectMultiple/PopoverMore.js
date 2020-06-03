import React from 'react'
import { Box, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/core'
import { pseudoTag } from '../styles'

export const PopoverMore = ({children, numberOfMore}) => {

  return <Popover placement="top">
    <PopoverTrigger>
      <Box {...pseudoTag} bg='gray.400' cursor='pointer'>
        <Text isTruncated>{numberOfMore - 5} more</Text>
      </Box>
    </PopoverTrigger>
    <PopoverContent zIndex={4} w='200px'>
      {children}
    </PopoverContent>
  </Popover>
};
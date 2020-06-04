import React from 'react'
import { Grid, Heading, Skeleton, Stack, IconButton, Tooltip, Box } from '@chakra-ui/core'
import {useRouter} from 'next/router'
import PropTypes from "prop-types";

export const PageHeader = ({ title, loading, rightAction, leftAction, borderBottom, noBackButton }) => {
  const router = useRouter()
  const containerStyles = {
    templateColumns: 'auto 1fr auto',
    alignItems:'center',
    p: 4,
    rounded: 'md'
  }
  const borderStyles = borderBottom ?
    {
      borderBottomWidth: '1px',
      rounded: '0'
    } :
    {
      borderWidth: '1px'
    }

  return <Grid {...containerStyles} {...borderStyles}>
    {!noBackButton ? <Tooltip label='Back' closeOnClick placement='top'>
      <IconButton mr={2} onClick={() => router.back()} mt={1} className='no-focus' fontSize='24px' icon='chevron-left' variant="ghost" size="xs" />
    </Tooltip> : <Box />}
    <Stack isInline spacing={4}>
      <Skeleton height="34px" w={loading && '350px'} isLoaded={!loading}>
        <Heading size='lg' mt={1}>
          {title}
        </Heading>
      </Skeleton>
      {leftAction}
    </Stack>
    {rightAction}
  </Grid>
}

PageHeader.propTypes = {
  title:PropTypes.any,
  loading:PropTypes.bool,
  rightAction:PropTypes.any,
  leftAction:PropTypes.any,
  borderBottom: PropTypes.object,
  noBackButton: PropTypes.bool,
}

import React from 'react'
import { pseudoInput, pseudoInputContainer, spinStyles } from '../styles'
import { Box, Grid, Icon, PseudoBox, Spinner, Tooltip } from '@chakra-ui/core'

export const PseudoInput = ({loading, showOptions, stateArray, placeholder, setShowOptions, children, addOrRemove}) => {

  return <PseudoBox
    {...pseudoInputContainer}
    onClick={() => stateArray.length <= 0 && setShowOptions(!showOptions)}
    bg={loading ? 'rgb(255,255,255)' : '#ffffff'}
    boxShadow={showOptions && '0 0 0 1px rgb(49, 130, 206)'}
    borderColor={loading ? 'rgb(243,246,249)' : showOptions && 'rgb(49, 130, 206)'}>
    <Box
      {...pseudoInput}
      color={loading && 'rgb(180,182,186)'}>
      {!stateArray.length && placeholder}
      {children}
    </Box>
    {loading ?
      <Grid {...spinStyles}>
        <Spinner size="sm"/>
      </Grid> :
      <Grid templateColumns='1fr 1fr' alignItems='center' gap='1'>
        {stateArray.length > 1 ? <Tooltip label="Remove All" placement="top">
          <Icon name='close' size='12px' color='red.500' cursor='pointer' onClick={() => {addOrRemove({type:'removeAll', value:{}})}}/>
        </Tooltip> : <Box w='20px' h='20px' />}
        <Icon name='chevron-down' size='20px' onClick={() => setShowOptions(!showOptions)}/>
      </Grid>
      }
  </PseudoBox>
};
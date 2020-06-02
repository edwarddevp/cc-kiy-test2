import React from 'react'
import { Box, Grid, Heading } from '@chakra-ui/core'
import { Container, ContainerGrid } from './styles'
import PropTypes from "prop-types";

export const BoxContainer = ({ title, styles, children, noBorder, actions }) => {
  return <Box {...Container} {...styles} border={noBorder && 'none'}>
    {title && <Grid {...ContainerGrid}>
      <Heading size='sm' mb='10px'>{title}</Heading>
      {actions}
    </Grid>}
    {children}
  </Box>
}

BoxContainer.propTypes = {
  title:PropTypes.string,
  styles:PropTypes.object,
  children:PropTypes.any,
  noBorder:PropTypes.bool,
  actions:PropTypes.any
};

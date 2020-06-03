import React from 'react'

export const pseudoInputContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: '10px',
  transition: 'all 0.2s',
  fontSize: '1rem',
  pl: '1rem',
  pr: '10px',
  height: '2.5rem',
  lineHeight: '2.5rem',
  borderWidth: '1px',
  borderColor: 'inherit',
  rounded: 'md',
  alignItems: 'center',
  alignContent: 'center',
  _hover: {
    borderColor: '#CBD5E0'
  }
}
export const pseudoInput = {
  transition: 'all 0.2s',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(100px, 1fr))',
  gridGap: '5px',
}
export const pseudoTag = {
  transition: 'all 0.2s',
  fontSize: '1rem',
  pl: '1rem',
  pr: '10px',
  textAlign: 'center',
  height: '1.5rem',
  minH: '1.5rem',
  lineHeight: '1.5rem',
  bg: 'gray.300',
  rounded: 'md',
  color: '#000',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: '10px',
  alignItems: 'center'
}
export const spinStyles = {
  alignItems: 'center',
  justifyItems: 'center',
  // position: 'absolute',
  // right: 0,
  h: 8,
  // w: 8,
  bg: 'white',
  // zIndex: 999,
  m: 1
}
export const selectMultipleOptionsContainer = {
  p: '10px',
  borderX: 'solid 1px rgb(113, 144, 194)',
  borderBottom: 'solid 1px rgb(230, 230, 230)',
  position: 'absolute',
  width: '100%',
  zIndex: '2',
  bg: '#fff',
}
export const selectMultipleOptionsGrid = {
  templateColumns: 'repeat(auto-fill,minmax(200px, 1fr))',
  gap: '10px'
}
export const optionsItem = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridGap: 1,
  userSelect:'none',
  cursor: 'pointer',
  borderWidth: '1px',
  p: 1,
  _hover: {
    bg: 'rgba(30, 144, 255, 1)',
    color: '#fff'
  }
}
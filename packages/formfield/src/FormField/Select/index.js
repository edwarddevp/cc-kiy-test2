import React from 'react'
import { SelectSimple } from './SelectSimple'
import { SelectMultiple } from './SelectMultiple'
import { PseudoInput } from './SelectMultiple/PseudoInput'

export const Select = props => {
  return !props.multiple ?
    <SelectSimple {...props}/> :
    !props.loading ?
      <SelectMultiple {...props}/> :
      <PseudoInput loading={true} stateArray={[]} placeholder={props.placeholder}/>
};
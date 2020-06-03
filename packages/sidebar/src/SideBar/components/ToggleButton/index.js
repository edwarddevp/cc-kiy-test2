import React from 'react'
import {toggleButton, toggleIcon} from "../../styles";
import {Icon, PseudoBox} from "@chakra-ui/core";

export const ToggleButton = ({action, state, isCollapsible}) => {

  return isCollapsible ? <PseudoBox onClick={action} {...toggleButton}>
    <Icon {...toggleIcon} name={state ? 'chevron-left' : 'chevron-right'}/>
  </PseudoBox>:''
};
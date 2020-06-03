import React from 'react'
import {Box} from "@chakra-ui/core";
import {MenuItem} from '../MenuItem'
import {menuItems} from '../../styles'
import {useRouter} from "next/router";

export const MenuItems = ({items}) => {
  const Router = useRouter()
  const isActive = (item) => {
    return Router && Router.asPath === item?.route
  }

  return <Box {...menuItems}>
    {items.map((item, index) => <MenuItem key={index} item={item} active={isActive(item)}/>)}
  </Box>
};
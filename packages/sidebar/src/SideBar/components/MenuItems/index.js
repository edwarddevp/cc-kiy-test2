import React from 'react'
import {Box, Divider, Text} from "@chakra-ui/core";
import {MenuItem} from '../MenuItem'
import {menuItems} from '../../styles'
import {useRouter} from "next/router";

export const MenuItems = ({items}) => {
  const Router = useRouter()
  const isActive = (item) => {
    return Router && Router.pathname === item?.route
  }

  return <Box {...menuItems}>
    {items.map((item, index) =>
      item.divider ?
        <Divider key={index} borderColor='rgba(9,30,66,0.08)' my={6} borderWidth='3px'/>:
        item.title ?
          <Box key={index} mt={4}>
            <Text fontSize='1xl' fontWeight='400'>{item.title}</Text>
            <Divider borderColor='rgba(9,30,66,0.08)'/>
          </Box>:
      <MenuItem key={index} item={item} active={isActive(item)}/>)}
  </Box>
};
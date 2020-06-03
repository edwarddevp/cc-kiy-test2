import React from 'react'
import {Grid} from "@chakra-ui/core";
import {LeftMenuItem} from "./LeftMenuItem";
import {useRouter} from "next/router";

export const LeftMenu = ({menu = []}) => {
  const Router = useRouter()
  const isActive = (item) => {
    return Router && Router.asPath === item?.route
  }

  return <Grid templateColumns={`repeat(${menu.length}, auto)`} alignItems='center' gap={1}>
    {menu.map((item, index) => <LeftMenuItem key={index} item={item} active={isActive(item)}/>)}
  </Grid>
};
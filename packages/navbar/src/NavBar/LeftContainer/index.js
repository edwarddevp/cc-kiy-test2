import React from 'react'
import { Grid } from "@chakra-ui/core";
import {LeftMenu} from "./LeftMenu";
import {LeftAction} from "./LeftAction";


export const LeftContainer = ({menu, leftAction, logo}) => {

  return <Grid templateColumns='repeat(4, auto)' gap={4} alignContent='center'>
    {leftAction && <LeftAction action={leftAction} />}
    {logo}
    <LeftMenu menu={menu}/>
  </Grid>
};
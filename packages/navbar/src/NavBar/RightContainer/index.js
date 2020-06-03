import React from 'react'
import {Grid} from "@chakra-ui/core";
import {UserItem} from "./UserItem";
import {RightMenuAndActions} from "./RightMenuAndActions";

export const RightContainer = ({actions, avatarMenu}) => {

  return <Grid templateColumns='1fr auto' alignContent='center'>
    {actions && <RightMenuAndActions actions={actions} />}
    {avatarMenu && <UserItem avatarMenu={avatarMenu}/>}
  </Grid>
};
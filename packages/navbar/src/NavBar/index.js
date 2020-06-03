import React from 'react'
import {Box, Flex} from "@chakra-ui/core";
import {LeftContainer} from "./LeftContainer";
import {RightContainer} from "./RightContainer";

export const NavBar = ({menu, rightActions, leftAction, avatarAction, logo}) => {

  return <Box boxShadow='0px 1px 3px 0px rgba(221,221,221,1)' zIndex='1'>
    <Flex p={2} justify='space-between'>
      <LeftContainer menu={menu} leftAction={leftAction} logo={logo}/>
      <RightContainer actions={rightActions} avatarMenu={avatarAction}/>
    </Flex>
  </Box>
};
import React from 'react'
import {Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip} from "@chakra-ui/core";

export const LeftAction = ({action}) => {

  return <Menu closeOnSelect={false}>
    {({isOpen}) => (
      <React.Fragment>
        <Tooltip label={action.label} placement="bottom" showDelay={500} hasArrow zIndex={2}>
          <MenuButton
            as={IconButton}
            className='no-focus'
            {...action.styles}
            variant='ghost'
            icon={action.icon}
            bg={isOpen && '#ebedf0'}
            aria-label={action.label}>
          </MenuButton>
        </Tooltip>
        <MenuList p={0} ml={2}>
          <MenuItem p={0}>
            <Box rounded='md' bg='white' minW='300px'>
              {action.component}
            </Box>
          </MenuItem>
        </MenuList>
      </React.Fragment>
    )}
  </Menu>
};
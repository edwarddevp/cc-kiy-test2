import React from 'react'
import {Tooltip, Grid, IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/core";

export const RightMenuAndActions = ({actions = []}) => {

  return <Grid templateColumns={`repeat(${actions.length}, auto)`} alignItems='center' gap={2}>
    {actions.map((action, index) => <Menu key={index} closeOnSelect={false}>
        {({isOpen}) => (
          <React.Fragment>
            <Tooltip label={action.label} placement="bottom" showDelay={500} hasArrow zIndex={2}>
              <MenuButton
                as={IconButton}
                className='no-focus'
                fontSize='20px'
                variant='ghost'
                icon={action.icon}
                bg={isOpen && '#ebedf0'}
                aria-label={action.label}>
              </MenuButton>
            </Tooltip>
            <MenuList p={0} placement={action.placement}>
              <MenuItem p={0}>
                <Grid rounded='md' bg='white' minW='300px'>
                  {action.component}
                </Grid>
              </MenuItem>
            </MenuList>
          </React.Fragment>
        )}
      </Menu>
    )}
  </Grid>
};
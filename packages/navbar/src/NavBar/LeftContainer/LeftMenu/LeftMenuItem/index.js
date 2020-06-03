import React from 'react'
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Grid, Icon } from '@chakra-ui/core'
import { sidebarMenuItem } from '../../../styles'
import Link from 'next/link'

export const LeftMenuItem = ({ item = {}, active }) => {
  const RouterU = ({ item }) => {
    return item?.href ?
      <Button as='a' href={item.href} target='_blank' rightIcon="external-link" {...sidebarMenuItem}>
        {item.label}
      </Button> :
      item.route ?
        <Button bg={active && '#ebedf0'} {...sidebarMenuItem}>
          <Link href={item.route}>
            <a>
              {item.label}
            </a>
          </Link>
        </Button> :
        item.subItems ? <Menu>
            {({ isOpen }) => (
              <React.Fragment>
                <MenuButton bg={isOpen && '#ebedf0'} {...sidebarMenuItem} as={Button} rightIcon="chevron-down">
                  {item.label}
                </MenuButton>
                <MenuList>
                  {item?.subItems.map((subItem, index) =>
                    subItem.divider ?
                      <MenuDivider key={index}/> :
                      subItem.group ?
                        <MenuGroup key={index} title={subItem.group}>
                          {subItem.items.map((subItemGroup, index2) =>
                            subItemGroup?.href ?
                              <MenuItem key={index2} as="a" href={subItemGroup.href} target='_blank'>
                                <Grid w='100%' alignItems='center' templateColumns='1fr auto' gap={1}>
                                  <span>{subItemGroup.label}</span>
                                  <Icon name='external-link'/>
                                </Grid>
                              </MenuItem> :
                              subItemGroup.action ?
                                <MenuItem key={index2} onClick={subItemGroup.action}>
                                  {subItemGroup.label}
                                </MenuItem> :
                                <MenuItem key={index2}>
                                  <Link href={subItemGroup.route}>
                                    <a>
                                      {subItemGroup.label}
                                    </a>
                                  </Link>
                                </MenuItem>
                          )}
                        </MenuGroup> :
                        subItem?.href ?
                          <MenuItem key={index} as="a" href={subItem.href} target='_blank'>
                            <Grid w='100%' alignItems='center' templateColumns='1fr auto' gap={1}>
                              <span>{subItem.label}</span>
                              <Icon name='external-link'/>
                            </Grid>
                          </MenuItem> :
                          subItem.action ?
                            <MenuItem key={index} onClick={subItem.action}>
                              {subItem.label}
                            </MenuItem> :
                            <MenuItem key={index}>
                              <Link href={subItem.route}>
                                <a>
                                  {subItem.label}
                                </a>
                              </Link>
                            </MenuItem>)}
                </MenuList>
              </React.Fragment>
            )}
          </Menu> :
          item.action ?
            <Button {...sidebarMenuItem} onClick={item.action}>
              {item.label}
            </Button> :
            <Button {...sidebarMenuItem}>
              {item.label}
            </Button>
  }

  return <RouterU item={item}/>
}
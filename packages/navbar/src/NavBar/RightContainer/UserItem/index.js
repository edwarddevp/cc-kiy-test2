import React from 'react'
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Skeleton,
  Grid,
  Icon
} from '@chakra-ui/core'
import Link from 'next/link'

export const UserItem = ({ avatarMenu }) => {

  return <Menu>
    {({ isOpen }) => (
      <React.Fragment>
        <MenuButton px={2} className='no-focus'>
          {!avatarMenu?.user.name ?
            <Skeleton h='32px' w='32px' rounded='full'/> :
            <Avatar
              showBorder={isOpen}
              borderColor='blue.500' size='sm'
              name={`${avatarMenu?.user.name} ${avatarMenu?.user.lastName}`}
              src={avatarMenu?.user.img}/>}
        </MenuButton>
        <MenuList>
          {avatarMenu?.actions.map((item, indexItem) =>
            item.divider ?
              <MenuDivider key={indexItem}/> :
              item.group ?
                <MenuGroup key={indexItem} title={item.group}>
                  {item.items.map((itemGroup, indexItemGroup) =>
                    itemGroup?.href ?
                      <MenuItem key={indexItemGroup} as="a" href={itemGroup.href} target='_blank'>
                        <Grid w='100%' alignItems='center' templateColumns='1fr auto' gap={1}>
                          <span>{itemGroup.label}</span>
                          <Icon name='external-link'/>
                        </Grid>
                      </MenuItem> :
                      itemGroup.action ?
                        <MenuItem key={indexItemGroup} onClick={itemGroup.action}>
                          {itemGroup.label}
                        </MenuItem> :
                        <MenuItem key={indexItemGroup}>
                          <Link href={itemGroup.route}>
                            <a>
                              {itemGroup.label}
                            </a>
                          </Link>
                        </MenuItem>
                  )}
                </MenuGroup> :
                item?.href ?
                  <MenuItem key={indexItem} as="a" href={item.href} target='_blank'>
                    <Grid w='100%' alignItems='center' templateColumns='1fr auto' gap={1}>
                      <span>{item.label}</span>
                      <Icon name='external-link'/>
                    </Grid>
                  </MenuItem> :
                  item.action ?
                    <MenuItem key={indexItem} onClick={item.action}>
                      {item.label}
                    </MenuItem> :
                    <MenuItem key={indexItem}>
                      <Link href={item.route}>
                        <a>
                          {item.label}
                        </a>
                      </Link>
                    </MenuItem>)}
        </MenuList>
      </React.Fragment>
    )}
  </Menu>
}
import React from 'react'
import { itemIcon, menuItem } from '../../../styles'
import { Box, Grid, Icon, PseudoBox, Text } from '@chakra-ui/core'
import Link from 'next/link'
import {buildParams} from '../../../helpers/buildParams'

export const Item = ({ item, showCollapse, setShowCollapse, active }) => {
  const RouterU = ({ item, children }) => {
    return item.href ?
      <Box as='a' href={item.href} target='_blank'>
        {children}
      </Box> :
      item.route ? <Link {...buildParams(item)}>
          {children}
        </Link> :
        item.action ? <Box onClick={item.action}>
            {children}
          </Box> :
          item.subItems ? <Box onClick={() => setShowCollapse(!showCollapse)}>
              {children}
            </Box> :
            <Box>
              {children}
            </Box>
  }

  return <PseudoBox {...menuItem} bg={active && 'rgb(235, 236, 240)'} color={active && 'blue.500'}>
    <Box {...itemIcon}>
      {(!item.icon || typeof item.icon === 'string') ?
        <Icon size='18px' name={item.icon || 'chevron-right'}/>:
        item.icon
      }
    </Box>
    <RouterU item={item}>
      <Grid alignItems='center' lineHeight={1} py={2} h='45px'>
        <Text fontSize='sm' color={active ? 'blue.500' : '#42526E'}>{item.label}</Text>
        {item.description &&
        <Text fontSize='xs' mt='5px' color={active ? 'blue.500' : '#6B778B'}>{item.description}</Text>}
      </Grid>
    </RouterU>
    {item.subItems && <Box {...itemIcon} onClick={() => setShowCollapse(!showCollapse)}>
      <Icon size='18px' name={item.icon || (showCollapse ? 'chevron-up' : 'chevron-down')}/>
    </Box>}
    {item.href && <Box {...itemIcon}>
      <Icon size='16px' name='external-link'/>
    </Box>}
  </PseudoBox>
}
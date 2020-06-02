import moment from 'moment'
import phoneNumber from './phoneNumber'
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip
} from '@chakra-ui/core'
import React, {Fragment} from 'react'
import { splitItem } from './splitItem'
import Link from 'next/link'

export const getValue = (headItem, row) => {
  let value

  switch (headItem.type) {
    case 'date':
      let v = row[headItem.field]
      /**
       * prueba
       */
      const fields = headItem.field.split('.')
      value = moment(row[fields[0]][fields[1]]).format(headItem.format || 'MM/DD/YYYY')
      break
    case 'phone':
      value = phoneNumber(row[headItem.field])
      break

    case 'array':
      //por si acaso...
      if (!row[headItem.field]) {
        row[headItem.field] = []
      }

      for (let i = 0; i < row[headItem.field].length; i++) {
        if (i === 0) {
          value = row[headItem.field][i]
        } else {
          value = value + ', ' + row[headItem.field][i]
        }

      }
      break

    case 'number':
      value = <Box> {row[headItem.field]} </Box>
      break

    case 'icon-true/false':
      value = row[headItem.field] === true ?
        <Box d="flex" justifyContent="flex-start"><Icon name="check" size={headItem.size || '32px'}
                                                        color="green.500"/></Box> :
        <Box d="flex" justifyContent="flex-start"><Icon name="close" size={headItem.size || '32px'}
                                                        color="red.500"/></Box>
      break

    case 'colorLabel':
      value = <Box color={row[headItem.field]}> {row[headItem.field]} </Box>
      break

    case 'color':
      value = <Box w="50%" size="50%" h="25px" bg={row[headItem.field]}/>
      break

    case 'img':
    case 'avatar':
      value = <Box> <Avatar src={row[headItem.field]} size={headItem.size || 'xs'}/> </Box>
      break

    case 'compositeImg':
      value = <Box h={headItem.size || '32px'} w={headItem.size || '32px'}>
        <Box pos="relative" h="100%" w="100%">

          <Box h="100%" w="100%" overflow="hidden">
            {row[headItem.field].map((img, index) => (
              <Image key={index} pos="absolute" src={img} zIndex={index}
                     size="100%"
              />
            ))}
          </Box>

        </Box>
      </Box>
      break

    case 'img+label':
      value = <Box d="flex">
        <Box d="flex"> <Image src={row[headItem.img]} atl={row[headItem.field]} size={headItem.size || '32px'}/>
        </Box>
        <Box d="flex"> {row[headItem.field]} </Box>
      </Box>
      break

    case 'label+func':
      value = <Box d="flex">
        <Box d="flex" onClick={() => headItem.func()}> {row[headItem.field]} </Box>
      </Box>
      break

    case 'internal-link':
      value = <Box>
        <Link href={row[headItem.link]}>
          <a>
            {row[headItem.field]}
          </a>
        </Link>
      </Box>
      break

    case 'link':
      value = <Box>
        <a href={row[headItem.link]} target="_blank">{row[headItem.field]}</a>
      </Box>
      break

    case 'multi':
      value = headItem.subField ?
        <Popover>
          <PopoverTrigger>
            <Box>
              {splitItem(headItem.field, row)}
              <Tooltip label={'view content'}>
                {splitItem(headItem.subField, row) !== '' ? <IconButton
                  size='xs'
                  style={{ marginLeft: '5px', marginBottom: '5px' }}
                  variant='link'
                  aria-label={'action.label'}
                  icon={'view'}/> : <Fragment></Fragment>}
              </Tooltip>
            </Box>
          </PopoverTrigger>
          <PopoverContent zIndex={4}>
            <PopoverArrow/>
            <PopoverBody>
              <Text my={2} dangerouslySetInnerHTML={{ __html: splitItem(headItem.subField, row) }}/>
            </PopoverBody>
          </PopoverContent>
        </Popover> :
        splitItem(headItem.field, row)
      break

    // case 'linkArray':
    //   //por si acaso...
    //   if(row[headItem.field] === undefined || row[headItem.fieldLinks] === undefined
    //     || row[headItem.fieldLinks].length !== row[headItem.field].length
    //     || row[headItem.field].length !== row[headItem.fieldLinks].length){
    //     row[headItem.field] = [];
    //     headItem.fieldLinks = [];
    //   }
    //
    //   for(let i = 0; i < row[headItem.field].length; i++){
    //     if(i === 0){
    //       value = <Box d="flex" mx="2px">
    //         <Link href={row[headItem.fieldLinks][i]} isExternal>
    //           row[headItem.field][i]
    //         </Link>
    //       </Box>;
    //     }
    //     else{
    //       value = <Box d="flex" mx="5px">
    //         <Link href={row[headItem.fieldLinks][i]} isExternal>
    //           | row[headItem.field][i]
    //         </Link>
    //       </Box>;
    //     }
    //
    //   }
    //   break;

    default:
      // value = toLowerCase(row[headItem.field] || row[headItem]);
      value = row[headItem.field] || row[headItem]
      break
  }

  return value

}

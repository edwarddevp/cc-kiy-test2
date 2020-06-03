import React from 'react'
import Collapse from "@chakra-ui/core/dist/Collapse";
import {Item} from "../Item";

export const CollapseItems = ({item, setShowCollapse, showCollapse, active}) => {

  return <Collapse top='0' roundedRight='md' ml={4} isOpen={showCollapse} borderLeftWidth='2px' borderColor='gray.500'>
    {item.subItems.map((subItem, index) => <Item
      key={index}
      active={active}
      item={subItem}
      setShowCollapse={setShowCollapse}
      showCollapse={setShowCollapse}/>
    )}
  </Collapse>
};
import React, {useState} from 'react'
import {Item} from "./Item";
import {CollapseItems} from "./CollapseItems";

export const MenuItem = ({item, active}) => {

  const [show, setShow] = useState(false)

  return <>
    <Item
      item={item}
      active={active}
      setShowCollapse={setShow}
      showCollapse={show} />
    {item.subItems && <CollapseItems
      showCollapse={show}
      setShowCollapse={setShow}
      item={item}
      active={active}/>}
  </>

};
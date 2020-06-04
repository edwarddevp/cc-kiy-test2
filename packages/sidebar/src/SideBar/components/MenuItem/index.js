import React, {useState,Fragment} from 'react'
import {Item} from "./Item";
import {CollapseItems} from "./CollapseItems";

export const MenuItem = ({item, active}) => {

  const [show, setShow] = useState(false)

  return <Fragment>
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
  </Fragment>

};

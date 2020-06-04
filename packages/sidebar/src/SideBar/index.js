import React from 'react'
import {Grid, Collapse, PseudoBox} from "@chakra-ui/core";
import {container, draggable} from './styles'
import {HeadItem} from "./components/HeadItem";
import {MenuItems} from "./components/MenuItems";
import {ToggleButton} from "./components/ToggleButton";
import {useDrawerActions} from "./hooks/useDrawerActions";
import PropTypes from "prop-types";

export const SideBar = ({head, menu, isResizable = false, isCollapsible = false}) => {

  const [
    showDrawer,
    setShowDrawer,
    showData,
    showToggle,
    setShowToggle,
    widthDrawer,
    resize
  ] = useDrawerActions(isResizable)

  return <Grid
    {...container}
    w={`${widthDrawer}px`}
    onMouseOver={() => setShowToggle(true)}
    onMouseLeave={() => setShowToggle(false)}>
    <>
      {(showToggle || !showDrawer) && <ToggleButton isCollapsible={isCollapsible} action={() => setShowDrawer(!showDrawer)} state={showDrawer}/>}
      <Collapse isOpen={showData}>
        {(showDrawer && head) && <HeadItem data={head}/>}
        {showDrawer && <MenuItems items={menu}/>}
      </Collapse>
    </>
    {isResizable && <PseudoBox {...draggable} onDrag={resize}/>}
  </Grid>
};

SideBar.propTypes = {
  head:PropTypes.object,
  menu:PropTypes.array,
  isResizable:PropTypes.bool,
  isCollapsible:PropTypes.bool
}

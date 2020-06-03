
export const container = {
  templateColumns: '1fr auto',
  transition: 'all 0.3s ease',
  position: 'relative',
  bg: 'rgb(244, 245, 247);'
}

export const toggleButton = {
  _hover: {bg: 'blue.400'},
  cursor: 'pointer',
  top: '29px',
  right: -12,
  // zIndex: '99999',
  position: 'absolute',
  h: '25px',
  w: '25px',
  rounded: '50%',
  bg: 'blue.500',
}

export const toggleIcon = {
  color: 'white',
  mb: '1px',
  mr: '2px',
  size: '24px'
}

export const header = {
  alignItems: 'center',
  gap: 2,
  templateColumns: 'auto 1fr',
  h: '80px',
  py: 4,
  mx: 4,
  borderBottomWidth: '1px'
}

export const headerImg = {
  rounded: "md",
  size: "35px",
  fallbackSrc: 'https://dummyimage.com/40x40/34b5e0/ffffff&text=H',
  alt: "Head"
}

export const menuItems = {
  transition: 'all 3s ease',
  py: 2,
  px: 4,
  // bg:'red.500',
  overflowY: 'auto',
  overflowX: 'hidden',
  // h: 'calc(100vh - 136px)'
}

export const menuItem = {
  mb:'1px',
  rounded: 'md',
  cursor: 'pointer',
  transition:'ease-in .2s',
  _hover: {
    bg: 'rgb(235, 236, 240)'
  },
  d: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr auto'
}

export const itemIcon = {
  px:2,
  pb:1
}

export const draggable = {
  w:'5px',
  draggable:true,
  transition:'ease-in .2s' ,
  cursor:'w-resize' ,
  _hover:{bg:'blue.300'},
}
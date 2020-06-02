export const headItem = {
  px: 2,
  py: 3,
  color: '#757575',
  d:'flex'
}

export const checkItem = {
  px: 4,
  size: 'lg'
}

export const noDataItem = {
  justifyContent: 'center',
  alignItems: 'center',
  h: '408px',
  color: 'gray.300',
  fontSize: '25px'
}

export const rowActionsContainer = {
  minW: '100px',
  p: 2,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
}

export const rowActionsButtonDefault = {
  size: 'xs',
  variant: 'outline',
}

export const rowActionsIconButton = {
  d: { sm: 'none', md: 'none', lg: 'block', xl: 'block' },
  px:0,
  ...rowActionsButtonDefault,
}

export const rowActionsButton = {
  d: { sm: 'block', md: 'block', lg: 'none', xl: 'none' },
  minW: '70px',
  ...rowActionsButtonDefault
}

export const collapseButton = {
  size: 'xs',
  variantColor: 'gray',
  variant: 'outline',
  ariaLabel: 'Collapse',
  icon: 'chevron-down',
}

export const headActionItem = {
  minW: '100px',
  textAlign: 'center',
  children: 'Actions',
  isTruncated: true
}

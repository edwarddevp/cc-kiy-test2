import React from 'react'
import { Grid, IconButton, Tooltip } from '@chakra-ui/core'
import { buildParams } from '../../../Helpers/buildParams'
import { collapseButton, rowActionsButton, rowActionsContainer, rowActionsIconButton } from '../../../styles'
import Button from '@chakra-ui/core/dist/Button'
import Link from 'next/link'

export const RowActions = ({ actions, row, collapse, showCollapse, setShowCollapse, direction }) => {

  const actionLength = collapse ? actions.length + 1 : actions.length
  const handleCollapse = rowId => {
    if (showCollapse === rowId) {
      setShowCollapse('')
    } else {
      setShowCollapse(rowId)
    }
  }

  return <Grid
    {...rowActionsContainer}
    borderTopWidth={{ sm: !direction && '1px', md: !direction && '1px', lg: 0, xl: 0 }}
    borderBottomWidth={{ sm: direction && '1px', md: direction && '1px', lg: 0, xl: 0 }}
    templateColumns={{
      sm: `repeat(${actionLength}, 70px)`,
      md: `repeat(${actionLength}, 70px)`,
      lg: `repeat(${actionLength}, 25px)`,
      xl: `repeat(${actionLength}, 25px)`
    }}>
    {collapse && <Tooltip label='Collapse'>
      <IconButton {...collapseButton} onClick={() => handleCollapse(row.id || row._id)}/>
    </Tooltip>}
    {actions.map((action, index) => (
        action.isLink ?
          <Link key={index} {...buildParams(action.isLink, row)}>
            <a>
              <Tooltip label={action.label}>
                <IconButton
                  {...rowActionsIconButton}
                  variantColor={action.color || 'gray'}
                  aria-label={action.label}
                  icon={action.icon}/>
              </Tooltip>
              <Button
                {...rowActionsButton}
                aria-label={action.label}>
                {action.label}
              </Button>
            </a>
          </Link> :
          <div key={index}>
            <Tooltip key={index} label={action.label}>
              <IconButton
                {...rowActionsIconButton}
                variantColor={action.color || 'gray'}
                aria-label={action.label}
                icon={action.icon}
                onClick={() => action.handler(row)}/>
            </Tooltip>
            <Button
              {...rowActionsButton}
              aria-label={action.label}
              onClick={() => action.handler(row)}>
              {action.label}
            </Button>
          </div>
      )
    )}
  </Grid>
}
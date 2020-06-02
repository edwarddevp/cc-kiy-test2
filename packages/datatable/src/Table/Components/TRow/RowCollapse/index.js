import React from 'react'
import { Collapse } from '@chakra-ui/core'

export const RowCollapse = ({collapse, showCollapse, row}) => {

  const renderCollapse = (Component, row) => (<Component {...row} />)

  return <Collapse isOpen={showCollapse === (row._id || row.id)}>
    {renderCollapse(collapse, row)}
  </Collapse>
};
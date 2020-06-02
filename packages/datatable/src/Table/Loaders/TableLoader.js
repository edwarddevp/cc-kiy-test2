import React from 'react'
import { TRowLoader } from './TRowLoader'

export const TableLoader = ({columns, countRows = 10, selection, leftActions, actions, collapse}) => {

  return Array(countRows).fill('').map((_, index) =>
    <TRowLoader
      key={index}
      index={index}
      columns={columns}
      countRows={countRows}
      selection={selection}
      leftActions={leftActions}
      collapse={collapse}
      actions={actions}/>)
};
import React from 'react'


export const useSelectionTable = (list, localPaginate, page, limit, selected, setSelected, setSelectedRows) => {

  const allChecked = selected.length === limit
  const isIndeterminate = selected.some(Boolean) && !allChecked

  const changeSelected = row => {
    const id = row._id || row.id
    const idx = selected.indexOf(id)
    if (idx > -1) {
      setSelected(selected => selected.filter((id, i) => i !== idx))
      setSelectedRows(selectedRows => selectedRows.filter((row, i) => i !== idx))
    } else {
      setSelected(selected => [...selected, id])
      setSelectedRows(selectedRows => [...selectedRows, row])
    }
  }

  const changeSelectedAll = checked => {
    list.map(item => {
      const idx = selected.indexOf(item._id)
      if (checked) {
        if (idx === -1) {
          setSelected(selected => [...selected, item._id])
          setSelectedRows(selectedRows => [...selectedRows, item])
        }
      } else {
        setSelected([])
        setSelectedRows([])
      }
    })
  }

  return [
    allChecked,
    isIndeterminate,
    changeSelected,
    changeSelectedAll
  ]

};


import React, { useEffect, useReducer, useState } from 'react'
import { Box, Grid } from '@chakra-ui/core'
import { ClickOutside } from '../../../ClickOutside'
import { PseudoInput } from './PseudoInput'
import { PseudoTag } from './PseudoTag'
import { SelectMultipleOptions } from './SelectMultipleOptions'
import { PopoverMore } from './PopoverMore'

export const SelectMultiple = ({field, form, data, placeholder, loading, state}) => {

  const valueArray = []
  const [showOptions, setShowOptions] = useState(false)
  const initialData = field.value.map(initialItem => {
    return data.filter(dataItem => dataItem.value === initialItem)[0]
  })
  const [stateArray, addOrRemove] = useReducer((stateArray, {type, value}) => {
    switch (type) {
      case "add":
        return stateArray.filter(item => item === value).length === 0 ? [...stateArray, value] : stateArray;
      case "addAll":
        const other = [...data]
        return stateArray = other
      case "remove":
        return stateArray.filter(item => item !== value);
      case "removeAll":
        return stateArray.splice(0,stateArray.length);
      default:
        return stateArray;
    }
  }, initialData);

  useEffect(() => {
    !loading && stateArray.map(item => {
      valueArray.push(item?.value)
    })
    form.setFieldValue(field.name, valueArray)
    state && state(valueArray)
  }, [stateArray])

  return <Box position='relative'>
    <ClickOutside handleAction={() => setShowOptions(false)}>
      <PseudoInput
        loading={loading}
        showOptions={showOptions}
        stateArray={stateArray}
        placeholder={placeholder}
        addOrRemove={addOrRemove}
        setShowOptions={setShowOptions}>
        {
          !loading && stateArray.map((item, index) =>
            index < 5 && <PseudoTag key={index} addOrRemove={addOrRemove} item={item}/>
          )
        }
        {(stateArray.length > 5 && !loading) &&
        <PopoverMore numberOfMore={stateArray.length}>
          <Grid alignItems='top' gap='5px' p='5px' h={stateArray.length > 15 ? '300px':'auto'} overflowY='auto'>
            {
              stateArray.map((item, index) =>
                index > 4 && <PseudoTag key={index} addOrRemove={addOrRemove} item={item}/>
              )
            }
          </Grid>
        </PopoverMore>
        }
      </PseudoInput>
      {showOptions && <SelectMultipleOptions data={data} addOrRemove={addOrRemove} stateArray={stateArray}/>}
    </ClickOutside>
  </Box>
};
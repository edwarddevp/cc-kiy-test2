import React, { useState } from 'react'
import { Box, Button, Checkbox, Grid, Input, InputGroup, InputRightElement, PseudoBox, Text } from '@chakra-ui/core'
import { optionsItem, selectMultipleOptionsContainer, selectMultipleOptionsGrid } from '../styles'

export const SelectMultipleOptions = ({stateArray, addOrRemove, data}) => {

  const fieldExist = (data) => {
    return stateArray.filter(x => x.value === data?.value).length === 1
  }
  const [items, setItems] = useState(data);
  const [filter, setFilter] = useState('');

  const onFilterChange = (event) => {
    setFilter(event.target.value);
    const newArray = data.filter((item) => {
      return item.label.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    });
    setItems(newArray);
  };

  const cancel = () => {
    setFilter('');
    setItems(data);
  };

  return <Box {...selectMultipleOptionsContainer} >
    <Grid templateColumns='1fr auto' gap='1'>
      <InputGroup size="md" mb={2}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Filter"
          onChange={onFilterChange}
          value={filter}
        />
        <InputRightElement width="4.5rem">
          <Button isDisabled={filter === ''} variant='ghost' h="1.75rem" size="sm" variantColor='red' onClick={cancel}>
            clean
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button variant='outline' size="md" variantColor='green' onClick={() => {
        addOrRemove({type: 'addAll', value: {}})
      }}>
        Select All
      </Button>
    </Grid>
    <Grid {...selectMultipleOptionsGrid}>
      {items.map((item, index) =>
        <PseudoBox
          key={index}
          {...optionsItem}
          onClick={() => {
            addOrRemove(fieldExist(item) ? {type: 'remove', value: item} : {type: 'add', value: item})
          }}>
          <Checkbox
            onChange={() => {
            }}
            isReadOnly
            py={'4px'}
            isChecked={fieldExist(item)}/>
          <Text isTruncated>
            {item?.label}
          </Text>
        </PseudoBox>
      )}
    </Grid>
  </Box>
};
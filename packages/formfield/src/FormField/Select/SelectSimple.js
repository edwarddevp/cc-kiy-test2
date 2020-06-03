import React from 'react'
import { Box, Grid, Select, Spinner } from '@chakra-ui/core'

export const SelectSimple = ({field, form, name, placeholder, loading, data, state, size, variant}) => {

  const spinStyles = {
    alignItems: 'center',
    justifyItems: 'center',
    position: 'absolute',
    right: 0,
    h: size === 'small' ? 4:8,
    w: 8,
    bg: 'white',
    zIndex: 999,
    m: 1
  };
  const loadSpin = <Grid {...spinStyles}>
    <Spinner size="sm"/>
  </Grid>;

  const handleChange = (select) => {
    form && form.setFieldValue(field.name, select.target.value);
    state && state(select.target.value)
  };
  const isObject = (item, key) => {
    return typeof item === 'object' ? item[key] : item
  };

  return <Box position='relative'>
    {loading && loadSpin}
    <Select {...field} id={name} onChange={handleChange} placeholder={placeholder} disabled={loading} size={size} variant={variant}>
      {data.map((item, index) => (
        <option key={index} value={isObject(item, 'value')}>
          {isObject(item, 'label')}
        </option>)
      )}
    </Select>
  </Box>
};


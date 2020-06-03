import React from 'react'
import { Checkbox as CheckItem, CheckboxGroup } from '@chakra-ui/core'
import Box from '@chakra-ui/core/dist/Box'

export const CheckBox = ({field, form, data, inline}) => {

  const isArray = Array.isArray(data);

  const onChange = (e) => {
    form.setFieldTouched(field.name, true, false);
    form.setFieldValue(field.name, e);
  }

  return !isArray ?
    <Box>
      <CheckItem id={field.name} {...field} isChecked={field.value}>
        {data.label || 'label'}
      </CheckItem>
    </Box> :
    <CheckboxGroup id={field.name} isChecked={field.value} isInline={inline} onChange={onChange}>
      {data.map((item, index) =>
        <CheckItem key={index} value={item.value}>
          {item.label}
        </CheckItem>
      )}
    </CheckboxGroup>
}

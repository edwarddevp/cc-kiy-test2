import React from 'react'
import { Radio as RadioItem, RadioGroup } from '@chakra-ui/core'

export const Radio = ({field, data, inline}) => {
  return <RadioGroup {...field} id={field.name} isInline={inline}>
    {data.map((item, index) =>
      <RadioItem key={index} value={item.value}>
        {item.label}
      </RadioItem>
    )}
  </RadioGroup>
}

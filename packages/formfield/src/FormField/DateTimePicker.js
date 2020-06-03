import React, {Fragment} from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import { Button, Input, InputRightElement } from '@chakra-ui/core'
import Icon from '@chakra-ui/core/dist/Icon'
import InputGroup from '@chakra-ui/core/dist/InputGroup'

export const DateTimePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props.field);
  const TemplateInput = (inputProps) => {
    return <InputGroup>
      <Input
        type={inputProps.type}
        {...inputProps}
        id={inputProps.name}
        placeholder={props.placeholder || 'MM/DD/YYYY'}
        w='100%'
        autoComplete='off'/>
      <InputRightElement onClick={() => inputProps.onClick()} width="45px">
        <Button h="1.75rem" size="sm" variant="ghost">
          <Icon name="calendar"/>
        </Button>
      </InputRightElement>
    </InputGroup>
  };

  return (<Fragment>
      <DatePicker
        wrapperClassName='display-block'
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val)
        }}
        customInput={<TemplateInput/>}
      />

      { /*language=CSS*/}
      <style jsx global>{`
        .display-block {
          display: block !important;
        }
      `}
      </style>
    </Fragment>
  )
}

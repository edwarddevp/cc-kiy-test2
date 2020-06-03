import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core'
import { Field } from 'formik'
import { Editor } from './Editor'
import { Select } from './Select'
import { Radio } from './Radio'
import { CheckBox } from './CheckBox'
import { Password } from './Password'
import { File } from './File'
import { DateTimePicker } from './DateTimePicker'
import PropTypes from "prop-types";

export const FormField = ({type, name, label, data, placeholder, height, required, loading, inline, state, multiple,noLabel,isDisabled}) => {

  return <Field type={type === 'radio' || type === 'checkbox' ? 'text' : type} name={name}>
    {({field, form}) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired={required}>
        {!noLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
        {
          type === 'select' ?
            <Select field={field} form={form} multiple={multiple} name={name} placeholder={placeholder || label} data={data} loading={loading} state={state}/> :
            type === 'editor' ?
              <Editor field={field} form={form} placeholder={placeholder || label} height={height}/> :
              type === 'radio' ?
                <Radio field={field} data={data} inline={inline}/> :
                type === 'checkbox' ?
                  <CheckBox field={field} form={form} data={data} inline={inline}/> :
                  type === 'password' ?
                    <Password field={field} placeholder={placeholder || label}/> :
                    type === 'file' ?
                      <File field={field} form={form} placeholder={placeholder || label}/> :
                      type === 'datepicker' ?
                        <DateTimePicker field={field} placeholder={placeholder || label}/> :
                        <Input type={type} {...field} id={name} placeholder={placeholder || label} isDisabled={isDisabled}/>
        }
        {!noLabel && <FormErrorMessage>{form.errors[name]}</FormErrorMessage>}
      </FormControl>
    )}
  </Field>
};



FormField.propTypes = {
  type:PropTypes.string,
  name:PropTypes.string,
  label:PropTypes.string,
  data:PropTypes.array,
  placeholder:PropTypes.string,
  height:PropTypes.string,
  required:PropTypes.bool,
  loading:PropTypes.bool,
  inline:PropTypes.bool,
  state:PropTypes.func,
  multiple:PropTypes.bool,
  noLabel:PropTypes.bool,
  isDisabled:PropTypes.bool
}

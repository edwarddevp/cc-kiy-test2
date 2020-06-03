import React, { useState } from 'react'
import { Button, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/core'
import InputFiles from 'react-input-files'

export const File = ({field, form, placeholder}) => {
  const [files, setFiles] = useState([]);
  const onChange = (_files) => {
    setFiles([])
    const values = Object.values(_files);
    setFiles(labelFiles(values));
    form.setFieldTouched(field.name, true, false);
    form.setFieldValue(field.name, values);
  };

  const labelFiles = (array) => {
    return array.map((item, index) => {
        return (index > 0 ? '\xa0\xa0\xa0' : '') + item.name
      }
    )
  }

  return <InputFiles
    onChange={files_ => onChange(files_)}
    multiple
    style={{width: '100%', outline: 'none'}}>
    <InputGroup size="md">
      <Input
        {...field}
        value={files}
        id={field.name}
        pr="4.5rem"
        readOnly
        type={"text"}
        placeholder={placeholder}
      />
      <InputRightElement width="45px">
        <Button h="1.75rem" size="sm" variant="ghost">
          <Icon name="attachment"/>
        </Button>
      </InputRightElement>
    </InputGroup>
  </InputFiles>
}

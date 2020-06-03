import React from 'react'
import { Button, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/core'

export const Password = ({field, placeholder}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return <InputGroup size="md">
    <Input
      {...field}
      id={field.name}
      pr="4.5rem"
      type={show ? "text" : "password"}
      placeholder={placeholder}
    />
    <InputRightElement width="53px">
      <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
        {show ? <Icon name="view-off" /> : <Icon name="view" />}
      </Button>
    </InputRightElement>
  </InputGroup>
}

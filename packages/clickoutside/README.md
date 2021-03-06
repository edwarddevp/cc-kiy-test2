# clickoutside

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/clickoutside.svg)](https://www.npmjs.com/package/@cc-test2/clickoutside) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/clickoutside
```

## Usage

```jsx
import React, { Component } from 'react'
import {Box, Button, Code, Grid, Text, useDisclosure} from "@chakra-ui/core";
import ClickOutside from "@cc-test2/clickoutside";

const ExampleComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
         <>
           {
               isOpen ?
                   <ClickOutside handleAction={onClose}>
                       <Box rounded='md' bg='red.400' color='white' p={4}>
                           Click outside this button to close it</Box>
                   </ClickOutside> :
                   <Button variantColor={'blue'} onClick={onOpen}>Open Box</Button>
           }
         </>)
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

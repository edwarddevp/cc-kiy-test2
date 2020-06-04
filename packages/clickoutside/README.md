# clickoutside

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraftkit/clickoutside.svg)](https://www.npmjs.com/package/@codecraftkit/clickoutside) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraftkit/clickoutside
```

## Usage

```jsx
import React, { Component } from 'react'
import {Box, Button, Code, Grid, Text, useDisclosure} from "@chakra-ui/core";
import ClickOutside from "@codecraftkit/clickoutside";

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

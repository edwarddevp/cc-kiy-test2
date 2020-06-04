# modal

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/modal.svg)](https://www.npmjs.com/package/@cc-test2/modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/modal
```

## Usage

```jsx
import React, { Component } from 'react'
import {Button, Text, useDisclosure} from "@chakra-ui/core";
import Modal from "@cc-test2/modal";

const ExampleComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
         <>
            <Button size='xs' onClick={onOpen}>Open Modal</Button>
            <Modal
                title='Modal Title'
                buttonText='New'
                body={<Text>Text Inside the Modal body</Text>}
                closeOnOverlayClick={false}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}/>
         </>)
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

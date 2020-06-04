# alert

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraftkit/alert.svg)](https://www.npmjs.com/package/@codecraftkit/alert) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraftkit/alert
```

## Usage

```jsx
import React, { Component } from 'react'

import Alert from '@codecraftkit/alert'

const AlertComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
         <>
            <Button size='xs' onClick={onOpen}>Open Alert</Button>
            <Alert
                title='Delete Access'
                body="Are you sure? You can't undo this action afterwards."
                isOpen={isOpen}
                onClose={onClose}
                handleAction={()=>alert("Hello")}/>
         </>))
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

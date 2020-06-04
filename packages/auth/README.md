# auth

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraftkit/auth.svg)](https://www.npmjs.com/package/@codecraftkit/auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraftkit/auth
```

## Usage

```jsx
import React from 'react'
import {withAuthSync} from "@codecraftkit/auth";
import {GettingStartedContainer} from "../src/container/GettingStartedContainer";
import {Box} from "@chakra-ui/core";

const index = () => {
    return <Box style={{height: 'calc(100vh - 72px)'}} mt={4}>
        <GettingStartedContainer/>
    </Box>
};

export default withAuthSync(index);

```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

# auth

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/auth.svg)](https://www.npmjs.com/package/@cc-test2/auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/auth
```

## Usage

```jsx
import React from 'react'
import {withAuthSync} from "@cc-test2/auth";
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

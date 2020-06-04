# sessioncontext

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/sessioncontext.svg)](https://www.npmjs.com/package/@cc-test2/sessioncontext) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/sessioncontext
```

## Usage

```jsx
import React from 'react'

import { SessionContextProvider } from "@cc-test2/sessioncontext";

class MyApp extends App {
    render() {
        const { Component } = this.props;
        return <SessionContextProvider>
                <Component {...pageProps} />
        </SessionContextProvider>
    }
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

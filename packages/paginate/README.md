# paginate

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/paginate.svg)](https://www.npmjs.com/package/@cc-test2/paginate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/paginate
```

## Usage

```jsx
import React, { Component } from 'react'
import Paginate from "@cc-test2/paginate";

const ExampleComponent = () => {
  return (
        <Paginate total={50} limit={10} onChange={(page)=>console.log(page)} />
    ))
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

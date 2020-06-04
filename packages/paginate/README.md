# paginate

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraft/paginate.svg)](https://www.npmjs.com/package/@codecraft/paginate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraft/paginate
```

## Usage

```jsx
import React, { Component } from 'react'
import Paginate from "@codecraft/paginate";

const ExampleComponent = () => {
  return (
        <Paginate total={50} limit={10} onChange={(page)=>console.log(page)} />
    ))
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

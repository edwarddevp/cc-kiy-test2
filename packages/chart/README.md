# chart

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/chart.svg)](https://www.npmjs.com/package/@cc-test2/chart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/chart
```

## Usage

```jsx
import React, { Component } from 'react'

const Chart = dynamic(
  () => import('@cc-test2/chart').then((mod) => mod.Chart),
  { ssr: false }
)

const data = [{
    "category": "Lithuania",
    "value": 501.9,
    "marketing": 250
}, {
    "category": "Czech Republic",
    "value": 301.9,
    "marketing": 222,
    "sales": 251
}, {
    "category": "Ireland",
    "value": 201.1,
    "marketing": 170
}, {
    "category": "Germany",
    "value": 165.8,
    "marketing": 122
}, {
    "category": "Australia",
    "value": 139.9,
    "marketing": 99
}];

const ExampleComponent = () => {
    const { Chart } = useInitChart();
  return (
        <BoxContainer>
            Some interesting Text
        </BoxContainer>
    ))
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

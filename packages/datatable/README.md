# datatable

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraftkit/datatable.svg)](https://www.npmjs.com/package/@codecraftkit/datatable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraftkit/datatable
```

## Usage

```jsx
import React, { Component } from 'react'

import Table from "@codecraftkit/datatable";


const ExampleComponent = () => {
    const list = [
        {
            _id: '1',
            name: 'userName1',
            lastName: 'userLastName1',
            address: 'Maracaibo',
            age: '26',
            occupation: 'Developer',
            color: 'green'
        },
        {
            _id: '2',
            name: 'userName2',
            lastName: 'userLastName2',
            address: 'Maracaibo',
            age: '29',
            occupation: 'Developer'
        },
        {
            _id: '3',
            name: 'userName3',
            lastName: 'userLastName3',
            address: 'Maracaibo',
            age: '18',
            occupation: 'Designer'
            color: 'blue'
        },
        {
            _id: '4',
            name: 'userName4',
            lastName: 'userLastName4',
            address: 'Maracaibo',
            age: '22',
            occupation: 'Developer'
        },
        {
            _id: '5',
            name: 'userName5',
            lastName: 'userLastName5',
            address: 'Maracaibo',
            age: '33',
            occupation: 'Developer'
        }
    ];

   const head = [
        'name',
        {field:'lastName', label:'Apellido'},
        'address',
        {field:'age', label:'Edad'},
        'color',
        'occupation',
    ];
  return (
        <Table
            list={list}
            head={head}
        />
    ))
}


```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

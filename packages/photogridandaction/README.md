# photogridandaction

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@cc-test2/photogridandaction.svg)](https://www.npmjs.com/package/@cc-test2/photogridandaction) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cc-test2/photogridandaction
```

## Usage

```jsx
import React, { useState } from 'react'
import PhotoGridAndAction from "@cc-test2/photogridandaction";


const Test = () => {
    const [files,setFiles] = useState([])
    
    return (
        <PhotoGridAndAction 
            images={images} 
            state={files} 
            submitState={setFiles} 
            limit={4}
            removeAlbumImages
            removeAgencyImages
            removeImageAction={(image)=>console.log(image)} 
         />
        =)
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

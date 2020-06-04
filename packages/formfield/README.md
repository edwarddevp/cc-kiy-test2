# formfield

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@codecraftkit/formfield.svg)](https://www.npmjs.com/package/@codecraftkit/formfield) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @codecraftkit/formfield
```

## Usage

```jsx
import React, { Component } from 'react'
import FormField from "@codecraftkit/formfield";
import {Form, Formik} from "formik"

const ExampleComponent = () => {
  return (
    <Formik 
        initialValues={{subject:""}}
        onSubmit={onSubmit}>
        {() => (
            <Form>
                <Grid gap={4}>
                    <FormField 
                        type='text' 
                        required 
                        name='subject' 
                        label='Password'/>
                    <Button 
                        type='submit' 
                        size='xs' 
                        variantColor='green' 
                        justifySelf='flex-end'>
                        Submit
                    </Button>
                </Grid>
            </Form>
        )}
    </Formik>
    ))
}
```

## License

MIT © [CodeCraft](https://github.com/CodeCraft)

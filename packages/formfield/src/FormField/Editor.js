import React, {Fragment, useState} from 'react'
import { Editor as Tiny } from '@tinymce/tinymce-react'

export const Editor = ({field, form, height, placeholder}) => {

  const [localState, setLocalState] = useState(field.value)

  const filePickerCallback = (callback, value, meta) => {
    if (meta.filetype === 'image') {
      const input = document.getElementById('editor___input_hidden');
      input.click();
      input.onchange = function () {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          callback(e.target.result, {
            alt: file.name
          });
        };
        reader.readAsDataURL(file);
      };
    }
  }

  const onBlurHandler = () => {
    form.setFieldTouched(field.name, true, false);
    form.setFieldValue(field.name, localState);
  };

  const onChangeHandler = (content) => {
    setLocalState(content)
    // field.onChange();
  };

  const tinyEditorOptions = {
    height: `calc(${height || '100vh'} - 25px)`,
    menubar: false,
    relative_urls: false,
    file_browser_callback_types: 'image',
    file_picker_callback: filePickerCallback,
    paste_data_images: true,
    // branding: false,
    // TOOLBAR: cut copy paste charmap  media emoticons | template hr pagebreak nonbreaking visualblocks
    toolbar: 'print searchreplace undo redo | fontselect fontsizeselect | forecolor backcolor  bold italic | bullist numlist | alignnone aligncenter alignright alignjustify | table image link code  visualblocks ',
    // PLUGINS: media charmap emoticons hr toc nonbreaking pagebreak template autolink autosave  importcss tabfocus  textpattern legacyoutput
    plugins: 'paste image link lists code print searchreplace table visualblocks imagetools'
  };

  return <Fragment>
    <input
      id="editor___input_hidden"
      type="file"
      value={''}
      onChange={()=>{} }
      name="editor___input_hidden"
      style={{display:"none"}}
    />
    <Tiny
      id={`editor___${field.name}`}
      value={field.value}
      placeholder={placeholder}
      onEditorChange={onChangeHandler}
      onBlur={onBlurHandler}
      init={tinyEditorOptions}
    />
  </Fragment>
}

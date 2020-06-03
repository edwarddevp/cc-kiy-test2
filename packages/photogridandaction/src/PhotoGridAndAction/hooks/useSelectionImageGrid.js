import React from 'react'

export const useSelectionImageGrid = ({selected = [], setSelected,removeSelectedAction,removeLocalImage,items}) => {
    const allChecked = selected.length === items.length;

    const selectedMode = selected.length > 0;

    const removeSelected = () =>{
        const noLocalImagesToRemoves = selected.filter(image=>image.ETag);
        const localImagesToRemoves = selected.filter(image=>!image.ETag);
        setSelected([])

        //removeLocalImages
        localImagesToRemoves.length > 0 && removeLocalImage(localImagesToRemoves);

        //remove no local image
        removeSelectedAction && noLocalImagesToRemoves.length > 0 && removeSelectedAction(noLocalImagesToRemoves);
    };

    const changeSelected = image => {

        const isImageSelected = selected.filter(imageSelected => imageSelected.ETag
          ? imageSelected.ETag === image.ETag :imageSelected.idx === image.idx)

        if(isImageSelected.length){
            setSelected(selected.filter(imageSelected => imageSelected.ETag
                ? imageSelected.ETag !== image.ETag :imageSelected.idx !== image.idx))
        }else{
            setSelected([...selected,image])
        }
    };

    const changeSelectedAll = () => {
        if(allChecked){
            setSelected([])
        }else{
            setSelected(items)
        }
    };

    return [
        changeSelected,
        changeSelectedAll,
        removeSelected,
        selectedMode,
    ]

};

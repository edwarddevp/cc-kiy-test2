import React, {useEffect, useState} from 'react'

export const useManageLocalImages = ({state,submitState,setSelected,selected}) => {
    const [localImages,setLocalImages] = useState([]);

    //Remove a Local Image (Local images)
    const removeLocalImage = (localImageToRemove) => {
        const isArray = Array.isArray(localImageToRemove);

        const localImagesRemoved = isArray
            ? localImages.filter(localImage => !selected.includes(localImage))
            : localImages.filter(image => image.idx !== localImageToRemove.idx);
        setLocalImages(localImagesRemoved);
        submitState(localImagesRemoved.map(file=>file.file))
    };

    //Cleaning updating Local State
    useEffect( () => {
        if(state){
            const promise = Promise.resolve();
            Promise.all(state.map( (file,index) => promise.then(()=> readFile(file,index)))).then(data=>setLocalImages(data));
        }
    }, [state]);


    //Transform type file to a image to show
    const readFile = (file,index) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({idx:index,file, url:reader.result})
            };
            reader.readAsDataURL(file);
        });
    };

    //handle file input
    const onChangeInputFiles = (_files) => {
        setSelected && setSelected([]);
        setLocalImages([]);
        const values = Object.values(_files);
        submitState(values);
        if(!state){
            const promise = Promise.resolve();
            Promise.all(values.map( (file,index) => promise.then(()=> readFile(file,index)))).then(data=>setLocalImages(data));
        }
    };


    return [
        localImages,
        onChangeInputFiles,
        removeLocalImage,
    ]

};

import React, {Fragment, useState} from 'react'
import {imageGrid} from "./styles";
import {Grid, Spinner} from "@chakra-ui/core";
import { Alert } from "../Alert";
import {ImageItem} from "./Components/ImageItem";
import {ActionButton} from "./Components/ActionButton";
import {ImageGridNav} from "./Components/ImageGridNav";
import {useSelectionImageGrid} from "./hooks/useSelectionImageGrid";
import {imageType} from "./helpers/imageType";
import {useManageLocalImages} from "./hooks/useManageLocalImages";
import PropTypes from "prop-types";

export const PhotoGridAndAction = ({loading,images,size,limit,submitState,state,removeAlbumImages,removeAgencyImages,removeImageAction,agencyImageIcon,route,_id,selected, setSelected, selection,removeSelectedAction,filesToUploadWarning}) => {
    const itemsSize = size || '150px';
    const noLocalImages = images ? limit ? images.slice(0,limit) : images : [];
    const [imageToRemove,setImageToRemove] = useState('');
    const [alertRemoveSelected,setAlertRemoveSelected] = useState('');

    const [localImages,onChangeInputFiles, removeLocalImage,]= useManageLocalImages({state,submitState,setSelected,selected});
    const [
        changeSelected,
        changeSelectedAll,
        removeSelected,
        selectedMode
    ] = useSelectionImageGrid({
            selected,
            setSelected,
            removeSelectedAction,
            removeLocalImage,items:[...localImages,...noLocalImages]
        });


    const imageItemsProps = {
        selectedMode:selectedMode,
        selection:selection,
        selected:selected,
        changeSelected:changeSelected,
        itemsSize:itemsSize,
    };

    //Images Local
    const localImagesItems = localImages.map(image => <ImageItem
        key={image?.idx}
        image={image}
        type={imageType(image)}
        removeImage={removeLocalImage}
        enableRemove
        {...imageItemsProps}
    />);

    //Images from back
    const ImagesItems = noLocalImages.map(image => <ImageItem
        key={image?.ETag}
        image={image}
        type={imageType(image)}
        removeImage={setImageToRemove}
        agencyImageIcon={agencyImageIcon}
        enableRemove={imageType(image) === "AGENCY"? removeAgencyImages  : removeAlbumImages}
        {...imageItemsProps}
    />);

    //ActionButton After All Images
    const showMoreButton =  <ActionButton
        _id={_id}
        route={route}
        submitState={submitState}
        itemsSize={itemsSize}
        onChangeInputFiles={onChangeInputFiles}/>;

    //handle alerts
    const handleAlertRemoveImage = () => {
        setImageToRemove('');
        removeImageAction(imageToRemove);
    };

    const handleAlertRemoveSelectedImage = () => {
        setAlertRemoveSelected(false);
        removeSelected();
    };

    //Component
    return <Fragment>
        {/*number of  local images*/}
            <ImageGridNav
                filesToUploadWarning={filesToUploadWarning}
                filesToUploadLength={localImages?.length}
                changeSelectedAll={changeSelectedAll}
                setAlertRemoveSelected={setAlertRemoveSelected}
                selection={selection}
                selectedMode={selectedMode}
            />

            {loading
                ?<Grid minHeight={itemsSize} justifyContent='center' alignItems="center">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="gray.600"
                        size="xl"
                    />
                </Grid>
                :<Grid templateColumns={`repeat(auto-fill,minmax(${itemsSize},1fr))`} minHeight={itemsSize} {...imageGrid}>
                    {ImagesItems}
                    {localImagesItems}
                    {showMoreButton}
                </Grid>}

            <Alert
                title="Delete Image"
                body="Are you sure? You can't undo this action afterwards."
                isOpen={imageToRemove}
                onClose={()=>setImageToRemove('')}
                handleAction={handleAlertRemoveImage}/>

            <Alert
                title="Delete Selected Images"
                body="Are you sure? You can't undo this action afterwards."
                isOpen={alertRemoveSelected}
                onClose={()=>setAlertRemoveSelected(false)}
                handleAction={handleAlertRemoveSelectedImage}/>
        </Fragment>
};

PhotoGridAndAction.propTypes = {
  loading:PropTypes.bool,
  images:PropTypes.array,
  size:PropTypes.string,
  limit:PropTypes.number,
  submitState:PropTypes.func,
  state:PropTypes.array,
  removeAlbumImages:PropTypes.bool,
  removeAgencyImages:PropTypes.bool,
  removeImageAction:PropTypes.func,
  agencyImageIcon:PropTypes.any,
  route:PropTypes.string,
  _id:PropTypes.string,
  selected:PropTypes.array,
  setSelected:PropTypes.func,
  selection:PropTypes.bool,
  removeSelectedAction:PropTypes.func,
  filesToUploadWarning:PropTypes.bool
}


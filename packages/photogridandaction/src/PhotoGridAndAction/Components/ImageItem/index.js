import React, {useState, useEffect, Fragment} from 'react'
import {Box, Checkbox, Grid, IconButton, Image, PseudoBox, Skeleton, Tooltip} from "@chakra-ui/core";
import {
    imageContainer,
    ImageRemoveIcon,
    imageWrapper,
    iconBottomRight,
    triangleWhite,
    centerGrid, ImageSelectedCheckbox
} from "../../styles";
import {ModalPreviewImage} from "../ModalPreviewImage";
import {FaCloudUploadAlt,FaBuilding} from "react-icons/fa";

export const ImageItem = ({image,type,itemsSize,removeImage,enableRemove,agencyImageIcon,selection,selected,changeSelected,selectedMode}) => {
    const [isHover,setIsHover] = useState(false);
    const [showImagePreview,setShowImagePreview] = useState(false);
    const [loading,setLoading] = useState(true);
    const [isImageSelected,setIsImageSelected] = useState([]);

    useEffect(()=>{
      selection && setIsImageSelected(selected.filter(imageSelected => imageSelected.ETag
        ? imageSelected.ETag === image.ETag :imageSelected.idx === image.idx))
    },[selected])

    return <Grid
        position='relative'
        onMouseOver={() => {(enableRemove || selection) && setIsHover(true)}}
        onMouseLeave={() => {(enableRemove || selection) && setIsHover(false)}}
        {...imageContainer}
    >
        <Skeleton isLoaded={!loading}>
            <PseudoBox height={itemsSize} {...imageWrapper} bg={loading? 'white' : type==="LOCAL" && 'rgb(74,85,104,0.05)'}>
                {enableRemove && !selectedMode && isHover && <Tooltip label="Remove" placement='left' hasArrow >
                    <IconButton onClick={()=>removeImage(image)}{...ImageRemoveIcon}/>
                </Tooltip>}

                {selection && (selectedMode || isHover) &&  <Checkbox isChecked={Boolean(isImageSelected.length)} onChange={()=>changeSelected(image)}{...ImageSelectedCheckbox}/>}

                {type !== "GLOBAL" && <Fragment>
                        <Box {...triangleWhite}/>
                        <Tooltip label={type==="LOCAL"?"Pending to Upload":"Agency Only"} placement='left' hasArrow >
                            {
                                type === "LOCAL"
                                    ?<IconButton icon={FaCloudUploadAlt} color="green.500" {...iconBottomRight} />
                                    :<IconButton icon={agencyImageIcon || FaBuilding} {...iconBottomRight} />
                            }
                        </Tooltip>
                    </Fragment>}
                <Box onClick={()=>setShowImagePreview(true)} w='100%' h='100%'/>
            </PseudoBox>
            <Grid {...centerGrid}>
                <Image
                    onLoad={()=>setLoading(false)}
                    h={itemsSize}
                    src={image.url || image}
                    // alt={image?.fileName || "Album Image"}
                    objectFit="contain"
                />
            </Grid>
        </Skeleton>
        <ModalPreviewImage isOpen={showImagePreview} onClose={()=>setShowImagePreview(false)} imageSrc={image.url || image} />
    </Grid>
};

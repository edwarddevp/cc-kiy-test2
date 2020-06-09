import React, {useState} from 'react'
import {Grid, Image, Spinner} from "@chakra-ui/core";

import Modal from "@cc-test2/modal";

export const ModalPreviewImage = ({isOpen,onClose,imageSrc}) => {
    const [loading,setLoading] = useState(true);
    return <Modal
            title='Image Preview'
            body={<Grid minHeight={'568px'} templateRows='auto 1fr' justifyItems='center' alignItems='center' p={5}>
                <Image onLoad={()=>setLoading(false)} src={imageSrc}/>
                {loading && <Spinner/>}
            </Grid>}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
    />
};

import React from "react";
import {Button, Flex, Stack, Text} from "@chakra-ui/core";

export const ImageGridNav = ({filesToUploadWarning,filesToUploadLength,changeSelectedAll,setAlertRemoveSelected,selection,selectedMode}) =>
    <Stack isInline spacing={4} pl={2} alignItems="flex-end">
        {filesToUploadWarning && filesToUploadLength > 0 &&  <Flex pl={5} pt={2}>
            <Text fontSize='lg' color={'#D95D39'} >{`${filesToUploadLength} files to upload`}</Text>
        </Flex>}
        {selection && selectedMode && <Stack isInline spacing={4}>
            <Button variant="outline" bg="white" size="xs" onClick={changeSelectedAll}>Check All</Button>
            <Button variant="outline" bg="white" size="xs" onClick={()=>setAlertRemoveSelected(true)}>Delete Images</Button>
        </Stack>}
    </Stack>;
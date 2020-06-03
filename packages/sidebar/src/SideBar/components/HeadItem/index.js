import React from 'react'
import {header, headerImg} from "../../styles";
import Image from "@chakra-ui/core/dist/Image";
import {Box, Grid} from "@chakra-ui/core";
import Text from "@chakra-ui/core/dist/Text";

export const HeadItem = ({data}) => {

  return <Grid {...header}>
    {data.img && <Image {...headerImg} src={data.img} />}
    <Box>
      <Text fontSize='md' fontWeight='500'>{data.title}</Text>
      <Text fontSize='sm' color='gray.500'>{data.description}</Text>
    </Box>
  </Grid>
};
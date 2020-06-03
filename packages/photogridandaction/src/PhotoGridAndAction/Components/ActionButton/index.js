import React, {Fragment} from "react";
import {Box, Grid, Heading, PseudoBox} from "@chakra-ui/core";
import {showMoreButtonStyles} from "../../styles";
import InputFiles from "react-input-files";
import {FaPlus} from "react-icons/fa";
import Link from 'next/link'

export const ActionButton = ({route,_id,submitState,itemsSize,onChangeInputFiles}) => <Fragment>
    { route
        ? <Link href={route+'/[id]'} as={`${route}/${_id}`}>
          <a>
            <PseudoBox as={Grid} minHeight={itemsSize}  h='100%' {...showMoreButtonStyles}>
              <Heading size='md'>More...</Heading>
            </PseudoBox>
          </a>
        </Link>
        : submitState && <InputFiles
        onChange={files_ => onChangeInputFiles(files_)}
        multiple
        style={{width: '100%', outline: 'none'}}>
        <PseudoBox as={Grid} minHeight={itemsSize} h='100%' {...showMoreButtonStyles}>
            <Box as={FaPlus} size="40px" color='gray.600' />
        </PseudoBox>
    </InputFiles>}
</Fragment>;

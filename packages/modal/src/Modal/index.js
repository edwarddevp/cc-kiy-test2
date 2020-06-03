import React from 'react'
import { Modal as ChakraModal, Heading, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/core";
import PropTypes from "prop-types";

export const Modal = props => {
  const { title, body, isOpen, size, onClose, closeOnOverlayClick, closeOnEsc, isDisabled } = props;

  return <ChakraModal
    closeOnOverlayClick={closeOnOverlayClick}
    closeOnEsc={closeOnEsc}
    isOpen={isOpen}
    onClose={onClose}
    size={size || 'xl'}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>
        <Heading size='sm'>{title}</Heading>
      </ModalHeader>
      <ModalCloseButton isDisabled={isDisabled}/>
      <ModalBody>
        {body}
      </ModalBody>
    </ModalContent>
  </ChakraModal>
};

Modal.propTypes = {
  title:PropTypes.string,
  body:PropTypes.any,
  isOpen:PropTypes.bool,
  size:PropTypes.string,
  onClose:PropTypes.func,
  closeOnOverlayClick:PropTypes.bool,
  closeOnEsc:PropTypes.bool,
  isDisabled:PropTypes.bool
}

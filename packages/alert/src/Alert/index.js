import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/core";
import PropTypes from "prop-types";

export const Alert = props => {

  const { title, body, isOpen, onClose, handleAction, textActionButton } = props;

  return <AlertDialog
    isOpen={isOpen}
    onClose={onClose}
  >
    <AlertDialogOverlay/>
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        {title}
      </AlertDialogHeader>

      <AlertDialogBody>
        {body}
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button onClick={onClose} size='sm'>
          Cancel
        </Button>
        <Button variantColor="red" size='sm' onClick={handleAction} ml={3}>
          {textActionButton || 'Delete'}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
};

Alert.propTypes = {
  title:PropTypes.string,
  body:PropTypes.any,
  isOpen:PropTypes.bool,
  onClose:PropTypes.func,
  handleAction:PropTypes.func,
  textActionButton:PropTypes.string
};

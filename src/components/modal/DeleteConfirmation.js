import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteAttribute } from '../../store/attributes/attributeSlice';
import { deleteProduct } from '../../store/products/productSlice';

function DeleteConfirmation({id, changed, caseType}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log(id);
    switch (caseType) {
      case 'attributes':
        dispatch(deleteAttribute(id));
        break;
      case 'products':
        dispatch(deleteProduct(id));
        break;
    
      default:
        break;
    }
    changed(true);
    toggle(); // Close the modal after deleting
  };

  return (
    <div>
      <i className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" onClick={toggle}/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

DeleteConfirmation.propTypes = {
    id: PropTypes.number.isRequired,
    changed: PropTypes.func,
    caseType: PropTypes.string,
};

export default DeleteConfirmation;

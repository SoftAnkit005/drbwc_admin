import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteAttribute } from '../../store/attributes/attributeSlice';
import { deleteProduct } from '../../store/products/productSlice';
import { deleteCategory } from '../../store/category/categorySlice';
import { deleteBanner } from '../../store/banner/bannerSlice';
import { deleteSubCategory } from '../../store/subcategory/subcategorySlice';
import { deleteTags } from '../../store/tags/tagsSlice';
import { deleteReviews } from '../../store/reviews/reviewsSlice';

function DeleteConfirmation({id, changed, caseType, title}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const handleDelete = () => {
    switch (caseType) {
      case 'attributes':
        dispatch(deleteAttribute(id));
        break;
      case 'products':
        dispatch(deleteProduct(id));
        break;
      case 'categories':
        dispatch(deleteCategory(id));
        break;
      case 'sub_categoreis':
        dispatch(deleteSubCategory(id));
        break;
      case 'banner':
        dispatch(deleteBanner(id));
        break;
      case 'tags':
        dispatch(deleteTags(id));
        break;
      case 'reviews':
        dispatch(deleteReviews(id));
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
          Are you sure you want to delete <span className='text-danger fw-semibold'>{title}</span> ?
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
    id: PropTypes.number,
    changed: PropTypes.func,
    caseType: PropTypes.string,
    title: PropTypes.string,
};


export default DeleteConfirmation;

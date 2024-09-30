import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TbLock, TbLockOpen } from "react-icons/tb";
import { ImBlocked } from "react-icons/im";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import cogoToast from 'cogo-toast';
import { updateUserData } from '../../store/users/userSlice';


function BlockUnblockUser({ changed, caseType, data }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const handleDelete = () => {
    switch (caseType) {
      case '1':
        dispatch(updateUserData({ id: data.id, status: "2" }))
        .then(() => {
          cogoToast.error('User Blocked!');
        })
        break;
      case '2':
        dispatch(updateUserData({ id: data.id, status: "1" }))
        .then(() => {
          cogoToast.success('User Unblocked!');
        })
        break;

      default:
        break;
    }
    changed(true);
    toggle(); // Close the modal after deleting
  };

  return (
    <div>
      {caseType === '1' ?
        <TbLockOpen className="bi bi-trash cursor-pointer ms-2 text-success fs-5" onClick={toggle} /> 
        : 
        <TbLock className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" onClick={toggle} />
        }
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><label className="d-flex align-items-center"><ImBlocked className={`me-1 ${caseType === '1' ? 'text-danger' : 'text-success'}`}/>{caseType === '1' ? 'Block User' : 'Unblock User'}</label></ModalHeader>
        <ModalBody>
          Are you sure you want to {caseType === '1' ? 'block' : 'unblock'} <span className='text-danger fw-semibold'>{data.full_name}</span> ?
        </ModalBody>
        <ModalFooter>
          <Button color={caseType === '1' ? 'danger' : 'success'} onClick={handleDelete}>
            Yes, {caseType === '1' ? 'Block' : 'Unblock'}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

BlockUnblockUser.propTypes = {
  changed: PropTypes.func,
  caseType: PropTypes.string,
  data: PropTypes.object,
};


export default BlockUnblockUser;

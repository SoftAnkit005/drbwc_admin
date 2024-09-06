import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import './modalstyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createAttribute } from '../../store/attributes/attributeSlice';


function AddEditBanner({changed}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [attributeName, setAttributeName] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setimage] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.attribute);

  console.log(image, title, desc);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attributeName.trim()) {
      dispatch(createAttribute({ name: attributeName }));
      setAttributeName('');
      changed(true);
    }
    toggle()
  };

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Banner
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Banner</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody className="p-0">
                                <Row>
                                    <Col className="py-1" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Title</Label>
                                            <Input type="text" id="name" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="py-1" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Description</Label>
                                            <Input type="textarea" id="name" placeholder="Enter Description" onChange={(e) => setDesc(e.target.value)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="py-1" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Select Image</Label>
                                            <Input type="file" id="name" onChange={(e) => setimage(e.target.value)}/>                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="dark" onClick={toggle}>
                    Cancel
                </Button>
                <Button color="success"  disabled={loading} onClick={handleSubmit}>
                    Save
                </Button>
            </ModalFooter>
      </Modal>
    </div>
  );
}

// Add prop validation for pageName
AddEditBanner.propTypes = {
    changed: PropTypes.func,
};

export default AddEditBanner;
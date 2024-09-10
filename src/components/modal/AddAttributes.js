import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import './modalstyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createAttribute } from '../../store/attributes/attributeSlice';


function AddAttributes({ changed }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [attributeName, setAttributeName] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.attribute);

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
        Add Attribute
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Attribute</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody className="p-0">
                  <Row>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter Name" onChange={(e) => setAttributeName(e.target.value)} />
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
          <Button color="success" disabled={loading} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

// Add prop validation for pageName
AddAttributes.propTypes = {
  changed: PropTypes.func,
};

export default AddAttributes;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import './modalstyle.scss';
import Select from 'react-select';

const staticOptions = [
  { value: '1', label: 'Product 1' },
  { value: '2', label: 'Product 2' },
  { value: '3', label: 'Product 3' },
  // Add more static options as needed
];

function EditTrackingId({ trackType }) {
  const [modal, setModal] = useState(false);
  const [tagName, setTagName] = useState(""); // State for tag name
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const toggle = () => setModal(!modal);

  const handleSave = () => {

    if (trackType === 'edit') {
      console.log('edit');
      // dispatch(updateTags({ id: someId, ...formData })); // Replace someId with appropriate ID logic
    } else {
      console.log('add');
      // dispatch(addTags(formData));
    }

    toggle();
  };

  return (
    <div>
      <FaRegEdit className='text-dark cursor-pointer fs-4' onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>{trackType !== 'add' ? 'Edit' : 'Add'} Tracking Information</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody className="p-0">
                  <Row>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Tracking number</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Enter Name"
                          value={tagName}            // Bind tag name state
                          onChange={(e) => setTagName(e.target.value)} // Update tag name state
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="position">Courier Partner</Label>
                        <Select
                          closeMenuOnSelect={false}
                          options={staticOptions} // Use static options
                          value={selectedProducts}   // Bind selected products state
                          onChange={(selected) => setSelectedProducts(selected)} // Update selected products state
                        />
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
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

EditTrackingId.propTypes = {
    trackType: PropTypes.string,
};

export default EditTrackingId;

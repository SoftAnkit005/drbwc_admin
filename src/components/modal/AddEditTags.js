import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import './modalstyle.scss'
import Select from 'react-select';


function AddEditTags() {
  const [modal, setModal] = useState(false);
  const [productState, setproductState] = useState(true);
  const toggle = () => setModal(!modal);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Tag
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Tag</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardTitle className="d-flex justify-content-end">
                                <FormGroup switch>
                                    <Input type="switch" checked={productState} onClick={() => { setproductState(!productState); }} />
                                </FormGroup>
                            </CardTitle>
                            <CardBody className="p-0">
                                <Row>
                                    <Col className="py-1" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Name</Label>
                                            <Input type="text" id="name" placeholder="Enter Name" />
                                        </FormGroup>
                                    </Col>
                                    <Col className="py-1" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="position">Choose Products</Label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                options={options}
                                                isMulti
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
                <Button color="success" onClick={toggle}>
                    Save
                </Button>
            </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddEditTags;
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import './modalstyle.scss'

function AddEditCategory() {
  const [modal, setModal] = useState(false);
  const [productState, setproductState] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Category
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Category</ModalHeader>
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
                                        <Label htmlFor="position">Parent Category</Label>
                                        <Input type="select" id="p_category">
                                        <option>Select...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" xs="12">
                                    <FormGroup>
                                        <Label htmlFor="position">Position</Label>
                                        <Input type="select" id="category">
                                        <option>Select...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" xs="12">
                                    <FormGroup>
                                        <Label htmlFor="description">Description</Label>
                                        <Input type="textarea" id="description" placeholder="Enter Description" />
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

export default AddEditCategory;
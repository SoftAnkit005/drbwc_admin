import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import './modalstyle.scss'


function AddEditReviews() {
  const [modal, setModal] = useState(false);
  const [productState, setproductState] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Review
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Review</ModalHeader>
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
                                            <Label htmlFor="review">Review</Label>
                                            <Input type="textarea" id="review" placeholder="Enter Review" />
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

export default AddEditReviews;
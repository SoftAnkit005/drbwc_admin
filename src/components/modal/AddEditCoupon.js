import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import './modalstyle.scss'

function AddEditCoupon() {
  const [modal, setModal] = useState(false);
  const [productState, setproductState] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Coupon
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader className="bg-primary text-white px-xl-5" toggle={toggle}>Add Coupon</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                    <Card>
                        <CardTitle className="border-bottom">
                            <div className="d-flex justify-content-between align-items-center px-4 py-3">
                                <h4 className='m-0 fw-semibold'>General</h4>
                                <FormGroup switch>
                                    <Input type="switch" checked={productState} onClick={() => { setproductState(!productState); }} />
                                </FormGroup>

                            </div>
                        </CardTitle>
                        <CardBody>
                            <Row>
                                <Col className="py-1" md="6">
                                    <FormGroup>
                                        <Label htmlFor="heading">Coupon Heading</Label>
                                        <Input type="text" id="heading" placeholder="Enter Coupon Heading" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6">
                                    <FormGroup>
                                        <Label htmlFor="code">Coupon Code</Label>
                                        <Input type="text" id="code" placeholder="Enter Coupon Code" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" xs="12">
                                    <FormGroup>
                                        <Label htmlFor="description">Coupon Description</Label>
                                        <Input type="textarea" id="description" placeholder="Enter Coupon Description" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6" lg="4">
                                    <FormGroup>
                                        <Label htmlFor="discount_amount">Discount amount</Label>
                                        <Input type="text" id="discount_amount" placeholder="Discount amount" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6" lg="4">
                                    <FormGroup>
                                        <Label htmlFor="">Start Date</Label>
                                        <Input type="date" id="" placeholder="Start Date" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6" lg="4">
                                    <FormGroup>
                                        <Label htmlFor="">End Date</Label>
                                        <Input type="date" id="" placeholder="Start Date" />
                                    </FormGroup>
                                </Col>
                                <hr/>
                                <Col className="py-1" xs="12">
                                    <FormGroup>
                                        <Label>Discount Type</Label>
                                        <FormGroup className="">
                                            <FormGroup check className="me-2">
                                                <Input type="radio" id="fixed_disc_entire" name="discount" />
                                                <Label htmlFor="fixed_disc_entire" check> Fixed discount to entire order</Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input type="radio" id="percentage_disc_entire" name="discount" />
                                                <Label htmlFor="percentage_disc_entire" check>Percentage discount to entire order</Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input type="radio" id="fixed_specific" name="discount" />
                                                <Label htmlFor="fixed_specific" check>Fixed discount to specific products</Label>
                                            </FormGroup>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6" lg="4" xl="3">
                                    <FormGroup>
                                        <Label htmlFor="">Minimum Purchase Amount</Label>
                                        <Input type="text" id="" placeholder="Item Weight" />
                                    </FormGroup>
                                </Col>
                                <Col className="py-1" md="6" lg="4" xl="3">
                                    <FormGroup>
                                        <Label htmlFor="">Minimum Purchase Qty</Label>
                                        <Input type="text" id="" placeholder="Item Weight" />
                                    </FormGroup>
                                </Col>
                                <hr/>
                                <Col className="py-1" md="6" lg="4">
                                    <FormGroup check className="me-2">
                                        <Input type="checkbox" id="free_shiping" />
                                        <Label htmlFor="free_shiping" check>Free Shiping</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className="px-5">
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

export default AddEditCoupon;
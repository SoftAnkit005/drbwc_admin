import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'

const StoreSetting = () => {

  return (
    <Row>
        <Col sm="12">
            <Card>
                <CardHeader>
                    <h5 className='mb-0'>Store Information</h5>
                </CardHeader>
                <CardBody className="px-0">
                    <Row>
                        <Col md="6" lg="4">
                            <FormGroup>
                                <Label htmlFor="name">Store Name</Label>
                                <Input type="text" id="name" placeholder="Enter Name" />
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="4">
                            <FormGroup>
                                <Label htmlFor="name">Store Phone Number</Label>
                                <Input type="text" id="name" placeholder="Enter Phone Number" />
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="4">
                            <FormGroup>
                                <Label htmlFor="name">Store Email</Label>
                                <Input type="text" id="name" placeholder="Enter Email" />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Store Description</Label>
                                <Input type="textarea" id="name" placeholder="Enter Description" />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Store Address</Label>
                                <Input type="textarea" id="name" placeholder="Enter Address" />
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="3">
                            <FormGroup>
                                <Label htmlFor="position">Country</Label>
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
                        <Col md="6" lg="3">
                            <FormGroup>
                                <Label>City</Label>
                                <Input type="text" id="name" placeholder="Enter City" />
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="3">
                            <FormGroup>
                                <Label htmlFor="position">State</Label>
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
                        <Col md="6" lg="3">
                            <FormGroup>
                                <Label>PostalCode</Label>
                                <Input type="text" id="name" placeholder="Enter PostalCode" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button className="mt-2" color="success"> Save </Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
  )
}

export default StoreSetting
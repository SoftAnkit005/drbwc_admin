import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'

const PaymentSetting = () => {

  return (
    <Row>
        <Col sm="12">
            <Card>
                <CardHeader className="d-flex align-items-center justify-content-between">
                    <h5 className='mb-0'>Razorpay Payment</h5>
                    <FormGroup switch>
                        <Input type="switch" defaultchecked="true"/>
                    </FormGroup>
                </CardHeader>
                <CardBody className="px-0">
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="name">Dislay Name</Label>
                                <Input type="text" id="name" placeholder="Enter Dislay Name" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="name">Publishable Key</Label>
                                <Input type="text" id="name" placeholder="Enter Publishable Key" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="name">Secret Key</Label>
                                <Input type="text" id="name" placeholder="Enter Secret Key" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="name">Webhook Secret Key</Label>
                                <Input type="text" id="name" placeholder="Enter Webhook Secret Key" />
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

export default PaymentSetting
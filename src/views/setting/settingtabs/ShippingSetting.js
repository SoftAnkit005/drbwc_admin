import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row } from 'reactstrap'
import { FaRegEdit } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import AddShippingZone from '../../../components/modal/settingmodals/AddShippingZone';

const ShippingSetting = () => {

  return (
    <Row>
        <Col sm="12">
            <Card>
                <CardHeader className="d-flex align-items-center justify-content-between">
                    <h5 className='mb-0'>Shipping</h5>
                   <AddShippingZone/>
                </CardHeader>
                <CardBody className="px-0">
                    <FormGroup className="shadow-sm bg-light p-3 rounded">
                        <div className='d-flex justify-content-between border-bottom border-dark mb-2 pb-2'>
                            <Label htmlFor="name">South Zone</Label>
                            <span className='d-flex align-items-center'>
                                <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                                <i className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" />
                            </span>
                        </div>
                        <Label htmlFor="name"> <FiMapPin className='text-success me-1'/>Gujarat, India.</Label>
                    </FormGroup>
                    <FormGroup className="shadow-sm bg-light p-3 rounded">
                        <Label htmlFor="name"><h5>India</h5><span>Gujarat</span></Label>
                    </FormGroup>
                    <div className='d-flex justify-content-end'>
                        <Button className="mt-2" color="success"> Save </Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
  )
}

export default ShippingSetting;
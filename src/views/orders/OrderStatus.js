import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { PiArrowBendUpLeftBold } from "react-icons/pi";

const OrderStatus = () => {
  const location = useLocation();
  const orderStatus = location.state || {};
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  console.log('orderStatus', orderStatus);

  return (
    <>
      <Button color="warning"
        outline onClick={goBack}>
        <PiArrowBendUpLeftBold />
      </Button>

      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              asdas
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <CardBody>
              asdas
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderStatus;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Button, CardTitle, CardSubtitle } from 'reactstrap';
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import { TbTruckDelivery } from "react-icons/tb";
import EditTrackingId from '../../components/modal/EditTrackingId';

const OrderStatus = () => {
  const location = useLocation();
  const orderStatus = location.state || {};
  const { products } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const productIds = orderStatus?.product_id?.split(',').map(id => parseInt(id, 10)); // Specify radix 10
  const productQty = orderStatus?.qty?.split(',').map(id => parseInt(id, 10)); // Specify radix 10
  const filteredProducts = products?.products?.filter(product => productIds?.includes(product.id)) || [];

  console.log('userData', userData);

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  useEffect(() => {
    if (!orderStatus || Object.keys(orderStatus).length === 0 || (products && filteredProducts.length === 0)) {
      navigate('/orders');
      cogoToast.warn('Product data not found!', { position: 'top-right' });
    }
  }, [orderStatus, navigate, filteredProducts, products]);

  console.log('orderStatus', orderStatus);
  console.log('filteredProducts', filteredProducts);
  const [userInfo, setuserInfo] = useState({})

  useEffect(() => {
    const info = (userData?.users?.find(user => user?.id === orderStatus?.user_id));
    setuserInfo(info);
  }, [userData, orderStatus])
  
  console.log(userInfo);
  return (
    <>
      <Button color="primary" className="mb-2" outline onClick={goBack}>
        <PiArrowBendUpLeftBold />
      </Button>

      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <CardTitle tag="h4" className="d-flex align-items-center justify-content-between">
                <span>Order Status: <span className='text-capitalize'>{orderStatus?.status}</span></span>
                <div className='d-flex gap-3 align-items-center'>
                    <EditTrackingId/>
                    <TbTruckDelivery className='fs-3'/>
                </div>
              </CardTitle>
              <CardSubtitle>
                <p className="text-muted">Tracking: {orderStatus.tracking_number || 'N/A'}</p>
                {filteredProducts?.map((product, index) => {
                  // Parse the image_urls and color_image_urls
                  const imageUrls = JSON.parse(product.image_urls || '[]');  // Parse image_urls
                  const colorImageUrls = JSON.parse(product.color_image_urls || '{}');  // Parse color_image_urls
                  
                  // Get the first color image if it exists
                  const firstColorKey = Object.keys(colorImageUrls)[0];
                  const firstColorImage = colorImageUrls[firstColorKey]?.[0];  // Get the first image from color_image_urls
                  
                  // Decide which image to use (color image or regular image)
                  const displayImage = firstColorImage || imageUrls[0] || '/images/avatar/avatar-1.png';  // Fallback to avatar if no image available

                  return (
                    <Row key={product.id}>
                      <Col md="6">
                        <div className="d-flex align-items-center h-100">
                          <div className="me-3">
                            <img src={`/${displayImage}`} alt={product.product_name} width="50" />
                          </div>
                          <div>
                            <h5 className="mb-0">{product.product_name}</h5>
                            <span className="text-muted">Color: {firstColorKey || 'N/A'}</span>
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="d-flex align-items-center justify-content-between h-100">
                            <h5 className="mb-0">₹{product.price} x {productQty[index]}</h5>
                            <h5 className="mb-0">₹{product.price * productQty[index]}</h5>
                        </div>
                      </Col>
                    </Row>
                  );
                })}
                <h5 className="mb-0 mt-2 d-flex justify-content-between aligin-items-center border-top border-bottom py-2"><span>Sub Total:</span> <span className='text-capitalize fw-semibold'>₹{orderStatus.total_amount || 'N/A'}</span></h5>
                <h5 className="mb-0 mt-4">Payment Method: <span className='text-capitalize fw-semibold'>{orderStatus.payment_method || 'N/A'}</span></h5>
              </CardSubtitle>
            </CardBody>
          </Card>
          <Col xs="12">
            <Card className="mb-0">
              <CardBody>
                <h4 className='fw-semibold'>Customer Info</h4>
                <p>Name: <span className="text-muted">{userInfo?.full_name || 'N/A'}</span></p>
                <p>Email: <span className="text-muted">{userInfo?.email || 'N/A'}</span></p>
                <p>Phone: <span className="text-muted">{orderStatus.customer_phone || 'N/A'}</span></p>
                <p>Address: <span className="text-muted">{orderStatus.shipping_address || 'N/A'}</span></p>
                <p>Order Date: <span className="text-muted">{orderStatus.updated_at || 'N/A'}</span></p>
                <p>Order ID: <span className="text-muted">{orderStatus.order_prefix || 'N/A'}</span></p>
              </CardBody>
            </Card>
          </Col>
        </Col>
        <Col lg="4">
          <div className="timeline">
            <h4 className='fw-semibold'>Delivery Status: Delivered</h4>
            <div className="line">
              <div className="line-content">
                <div className="content">
                  <h1>Delivered</h1>
                  <p>Shipment delivered</p>
                </div>
                <div className="content">
                  <h1>Delivering</h1>
                  <p>Departed country of origin</p>
                </div>
                <div className="content active">
                  <h1>Shipment accepted</h1>
                  <p>Departed country of origin</p>
                </div>
                <div className="content">
                  <h1>Pick up</h1>
                  <p>Shipment dispatched</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default OrderStatus;

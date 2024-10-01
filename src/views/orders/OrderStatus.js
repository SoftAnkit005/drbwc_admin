import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Button, CardTitle, CardSubtitle } from 'reactstrap';
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import EditTrackingId from '../../components/modal/EditTrackingId';
import { getOrders } from '../../store/orders/ordersSlice';

const OrderStatus = () => {
  const location = useLocation();
  const [ordersData, setordersData] = useState([]);
  const orderStatus = location.state || {};
  const { products } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productIds = orderStatus?.product_id?.split(',').map(id => parseInt(id, 10)); // Specify radix 10
  const productQty = orderStatus?.qty?.split(',').map(id => parseInt(id, 10)); // Specify radix 10
  const filteredProducts = products?.products?.filter(product => productIds?.includes(product.id)) || [];

  const currentStatus = ordersData?.status || 'pending';

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.success) {
      const filteredData = orders.orders.filter(order => order.id === orderStatus?.id);
      setordersData(filteredData[0]);
    }
  }, [orders]);

  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true, // 12-hour format with AM/PM
    timeZone: 'Asia/Kolkata', // Indian Standard Time
  };
  const orderUpdateddate = new Date(ordersData?.updated_at);
  // Dynamically update only the current status's description based on orderStatus.comments
  const statusOptions = [
    { 
      value: 'pending', 
      label: 'Pending', 
      description: currentStatus === 'pending' ? ordersData?.comments || 'Order is pending.' : 'Order is pending.'
    },
    { 
      value: 'awaiting-pickup', 
      label: 'Awaiting pickup', 
      description: currentStatus === 'awaitingpickup' ? ordersData?.comments || 'Waiting for pickup.' : 'Waiting for pickup.'
    },
    { 
      value: 'pick-up', 
      label: 'Pick Up', 
      description: currentStatus === 'pickup' ? ordersData?.comments || 'Shipment picked up by courier.' : 'Shipment picked up by courier.'
    },
    { 
      value: 'shipped', 
      label: 'Shipped', 
      description: currentStatus === 'shipped' ? ordersData?.comments || 'Shipment is in transit.' : 'Shipment is in transit.'
    },
    { 
      value: 'delivered', 
      label: 'Delivered', 
      description: currentStatus === 'delivered' ? ordersData?.comments || 'Shipment delivered to the destination.' : 'Shipment delivered to the destination.'
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      description: currentStatus === 'completed' ? ordersData?.comments || 'Order process completed.' : 'Order process completed.'
    }
  ];

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  useEffect(() => {
    if (!orderStatus || Object.keys(orderStatus).length === 0 || (products && filteredProducts.length === 0)) {
      navigate('/admin/orders');
      cogoToast.warn('Product data not found!', { position: 'top-right' });
    }
  }, [orderStatus, navigate, filteredProducts, products]);

  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    const info = (userData?.users?.find(user => user?.id === orderStatus?.user_id));
    setuserInfo(info);
  }, [userData, orderStatus]);
  
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
                <span>Order Status: <span className={`text-capitalize ${ordersData?.status !== "canceled" ? '' : 'text-danger'}`}>{ordersData?.status}</span></span>
                <div className='d-flex gap-3 align-items-center'>
                    <EditTrackingId order={orderStatus}/>
                    {/* <TbTruckDelivery className='fs-3'/> */}
                </div>
              </CardTitle>
              <CardSubtitle>
                <p className="text-muted">Tracking: {ordersData.tracking_number || 'N/A'}</p>
                {filteredProducts?.map((product, index) => {
                  const imageUrls = JSON.parse(product.image_urls || '[]');
                  const colorImageUrls = JSON.parse(product.color_image_urls || '{}');
                  const firstColorKey = Object.keys(colorImageUrls)[0];
                  const firstColorImage = colorImageUrls[firstColorKey]?.[0];
                  const displayImage = firstColorImage || imageUrls[0] || '/images/avatar/avatar-1.png';

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
                <h5 className="mb-0 mt-2 d-flex justify-content-between aligin-items-center border-top border-bottom py-2">
                  <span>Sub Total:</span> <span className='text-capitalize fw-semibold'>₹{ordersData?.total_amount || 'N/A'}</span>
                </h5>
                <h5 className="mb-0 mt-4">Payment Method: <span className='text-capitalize fw-semibold'>{ordersData?.payment_method || 'N/A'}</span></h5>
              </CardSubtitle>
            </CardBody>
          </Card>
          <Col xs="12">
            <Card className="mb-0">
              <CardBody>
                <h4 className='fw-semibold'>Customer Info</h4>
                <p>Name: <span className="text-muted">{userInfo?.full_name || 'N/A'}</span></p>
                <p>Email: <span className="text-muted">{userInfo?.email || 'N/A'}</span></p>
                <p>Phone: <span className="text-muted">{ordersData?.customer_phone || 'N/A'}</span></p>
                <p>Address: <span className="text-muted">{ordersData?.shipping_address || 'N/A'}</span></p>
                <p>Order Date: <span className="text-muted">{ordersData?.updated_at || 'N/A'}</span></p>
                <p>Order ID: <span className="text-muted">{ordersData?.order_prefix || 'N/A'}</span></p>
              </CardBody>
            </Card>
          </Col>
        </Col>
        <Col lg="4">
          <div className="timeline">
            <h4 className='fw-semibold text-capitalize'>Delivery Status</h4>
            {(ordersData?.status !== "canceled" && ordersData?.status !== "declined") ? (
              <div className="line">
                <div className="line-content">
                  {statusOptions.map((status) => (
                    <div key={status.value} className={`content ${currentStatus === status.value ? 'active' : ''}`} >
                      <h6 className="desc-md fw-semibold">{status.label}</h6>
                      <p className="text-muted desc-xxs">{status.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : ordersData?.status === "declined" ? (
              <div className="">
                <p className="text-muted desc-xxs">
                  {orderUpdateddate.toLocaleDateString('en-US', dateOptions)}
                </p>
                <h6 className="desc-md text-danger">Order Declined</h6>
                <p className="text-danger desc-xxs">Reason: {ordersData?.comments}</p>
              </div>
            ) : (
              <div className="">
                <p className="text-muted desc-xxs">
                  {orderUpdateddate.toLocaleDateString('en-US', dateOptions)}
                </p>
                <h6 className="desc-md text-danger">Order Canceled</h6>
                <p className="text-danger desc-xxs">Reason: {ordersData?.comments}</p>
              </div>
            )}

          </div>
        </Col>
      </Row>
    </>
  );
}

export default OrderStatus;

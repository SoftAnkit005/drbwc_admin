import { Card, CardBody, Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoCloseCircle } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { GiCardboardBox } from "react-icons/gi";
import { BsCashStack } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const AllDataCards = () => {
  const { orders } = useSelector((state) => state.orders);
  const { userData } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const [allOrders, setallOrders] = useState(null);
  const [allUsers, setallUsers] = useState(null);
  const [allProducts, setallProducts] = useState(null);
  const [activeOrders, setactiveOrders] = useState(null);
  const [completedOrders, setcompletedOrders] = useState(null);
  const [cancelledOrders, setcancelledOrders] = useState(null);
  const [declinedOrders, setdeclinedOrders] = useState(null);
  const [totalCompletedAmount, settotalCompletedAmount] = useState('')

  const formatCurrency = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if(orders?.success){
      setallOrders(orders.orders);
    }
    if(userData?.success){
      setallUsers(userData.users);
    }
    if(products?.success){
      setallProducts(products.products);
    }
  }, [orders, userData, products]);

  useEffect(() => {
    // Filter completed orders
    const completeOrders = allOrders?.filter(order => order.status === 'delivered');
    setcompletedOrders(completeOrders);
    const canceleOrders = allOrders?.filter(order => order.status === 'canceled');
    setcancelledOrders(canceleOrders);
    const declineOrders = allOrders?.filter(order => order.status === 'declined');
    setdeclinedOrders(declineOrders);
    const activeOrd = allOrders?.filter(order => order.status !== 'delivered' && order.status !== 'canceled' && order.status !== 'completed' );
    setactiveOrders(activeOrd);


    // Calculate the total amount of completed orders
    settotalCompletedAmount(completeOrders?.reduce((total, order) => {
        return total + parseFloat(order.total_amount); // Convert total_amount to float and sum up
    }, 0));
  }, [allOrders]);
  
  return (
    <Row>
      <Col md="6" lg="3" className="text-end">
        <Link to='/orders' className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="d-flex align-items-center justify-content-between">
              <IoCartOutline className='heading-xxl text-cyan'/>
              <div>
                <h5>Orders</h5>
                <h2 className='mb-0'>{allOrders?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="text-end">
        <Link to='/customers' className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="d-flex align-items-center justify-content-between">
              <HiOutlineUsers className='heading-xxl text-warning'/>
              <div>
                <h5>Users</h5>
                <h2 className='mb-0'>{allUsers?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="text-end">
        <Link to='/products' className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="d-flex align-items-center justify-content-between">
              <GiCardboardBox className='heading-xxl text-primary'/>
              <div>
                <h5>Total Products</h5>
                <h2 className='mb-0'>{allProducts?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="text-end">
        <Card className="bg-light">
          <CardBody className="d-flex align-items-center justify-content-between">
            <BsCashStack className='heading-xxl text-success'/>
            <div>
              <h5>Total Earnings</h5>
              <h2 className='mb-0'>₹{formatCurrency(totalCompletedAmount)}</h2>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md="6" lg="3" className="">
        <Link to="/orders" className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="position-relative">
              <MdOutlineRadioButtonChecked className='heading-sm text-warning position-absolute top-0 end-0 m-2'/>
              <div>
                <h5>Active Orders</h5>
                <h2 className='mb-0'>{activeOrders?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="">
        <Link to="/orders?status=delivered" className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="position-relative">
              <IoIosCheckmarkCircle className='heading-sm text-success position-absolute top-0 end-0 m-2'/>
              <div>
                <h5>Delivered Orders</h5>
                <h2 className='mb-0'>{completedOrders?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="">
        <Link to="/orders?status=canceled" className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="position-relative">
              <IoCloseCircle className='heading-sm text-danger position-absolute top-0 end-0 m-2'/>
              <div>
                <h5>User Cancelled Orders</h5>
                <h2 className='mb-0'>{cancelledOrders?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
      <Col md="6" lg="3" className="">
        <Link to="/orders?status=declined" className='text-decoration-none text-dark'>
          <Card className="bg-light">
            <CardBody className="position-relative">
              <FcCancel className='heading-sm text-danger position-absolute top-0 end-0 m-2'/>
              <div>
                <h5>Admin Declined Orders</h5>
                <h2 className='mb-0'>{declinedOrders?.length}</h2>
              </div>
            </CardBody>
          </Card>
        </Link>
      </Col>
    </Row>
  );
};

export default AllDataCards;

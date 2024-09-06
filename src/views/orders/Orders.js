import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import TableListing from '../../components/table/TableListing';
import { getOrders } from '../../store/orders/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [ordersData, setordersData] = useState([]);
  const [orderCheck, setorderCheck] = useState(false);

  const attrChanged = (e) => {
    setorderCheck(e);
  };

  useEffect(() => {
    dispatch(getOrders());
    setorderCheck(false);
  }, [dispatch, orderCheck]);

  useEffect(() => {
    if (orders?.success) {
      setordersData(orders.orders);
    }
  }, [orders]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(ordersData);
  return (
    <Card>
      <CardBody>
        <TableListing pageName="orders" tableData={ordersData} changeData={attrChanged}/>
      </CardBody>
    </Card>
  );
};

export default Orders;

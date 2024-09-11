import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import DataTableListing from '../../components/table/DataTableListing';
import { fetchUserData } from '../../store/users/userSlice';

const Customers = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.users);
  const [userAllData, setUserAllData] = useState([]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.success) {
      setUserAllData(userData.users);
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="users" tableData={userAllData} />
      </CardBody>
    </Card>
  );
};

export default Customers;

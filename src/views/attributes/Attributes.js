import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './attributes.scss';
import DataTableListing from '../../components/table/DataTableListing';
import { fetchAttributes } from '../../store/attributes/attributeSlice';

const Attributes = () => {
  const dispatch = useDispatch();
  const { attributes, loading, error } = useSelector((state) => state.attribute);
  const [attributesData, setattributesData] = useState([]);
  const [attrAddCheck, setattrAddCheck] = useState(false);

  const attrChanged = (e) => {
    setattrAddCheck(e);
  };

  useEffect(() => {
    dispatch(fetchAttributes());
    setattrAddCheck(false);
  }, [dispatch, attrAddCheck]);

  useEffect(() => {
    if (attributes?.success) {
      setattributesData(attributes.attributes);
    }
  }, [attributes]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="attributes" tableData={attributesData} changeData={attrChanged} />
      </CardBody>
    </Card>
  );
};

export default Attributes;

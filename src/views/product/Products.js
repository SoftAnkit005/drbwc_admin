import { useEffect, useState } from 'react';
import {CardBody, Card } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableListing from '../../components/table/TableListing';
import './product-style.scss'
import { fetchProducts } from '../../store/products/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [productsData, setproductsData] = useState([]);
  const [prodAddCheck, setprodAddCheck] = useState(false);

  const prodChanged = (e) => {
    setprodAddCheck(e);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    setprodAddCheck(false);
  }, [dispatch, prodAddCheck]);
  
  useEffect(() => {
    if (products?.success) {
      setproductsData(products?.products);
    }
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Card>
        <CardBody>
          <TableListing pageName="products" tableData={productsData} changeData={prodChanged}/>
        </CardBody>
      </Card>
    </>
  );
};

export default Products;

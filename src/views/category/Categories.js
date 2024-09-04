import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './categories.scss';
import TableListing from '../../components/table/TableListing';
import { fetchCategories } from '../../store/category/categorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [categoryData, setcategoryData] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    setcategoryData(categories?.categories);
    console.log(categories);
  }, [categories?.success]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardBody>
        <TableListing pageName="categories" tableData={categoryData}/>
      </CardBody>
    </Card>
  );
};

export default Categories;

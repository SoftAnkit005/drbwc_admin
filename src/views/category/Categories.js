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
  const [categorycheck, setcategoryCheck] = useState(false);

  const cateChanged = (e) => {
    setcategoryCheck(e);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    setcategoryCheck(false);
  }, [dispatch, categorycheck]);

  useEffect(() => {
    if (categories?.success) {
      setcategoryData(categories?.categories);
    };
  }, [categories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardBody>
        <TableListing pageName="categories" tableData={categoryData} changeData={cateChanged} />
      </CardBody>
    </Card>
  );
};

export default Categories;

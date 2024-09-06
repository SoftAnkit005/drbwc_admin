import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './categories.scss';
import { fetchCategories } from '../../store/category/categorySlice';
import DataTableListing from '../../components/table/DataTableListing';
import SubCatDataTableListing from '../../components/table/SubCatDataTableListing';
import { getsubcategories } from '../../store/subcategory/subcategorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const [categoryData, setcategoryData] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [categorycheck, setcategoryCheck] = useState(false);

  const cateChanged = (e) => {
    setcategoryCheck(e);
  };

  console.log(subCategoryData);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getsubcategories());
    setcategoryCheck(false);
  }, [dispatch, categorycheck]);

  useEffect(() => {
    if (categories?.success) {
      setcategoryData(categories?.categories);
    };
    if (subcategories?.success) {
      setsubCategoryData(subcategories?.subcategories);
    };
  }, [categories,subcategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Card>
        <CardBody>
          <DataTableListing pageName="categories" tableData={categoryData} changeData={cateChanged} />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <SubCatDataTableListing pageName="sub categories" tableData={subCategoryData} parentData={categoryData} changeData={cateChanged}/>
        </CardBody>
      </Card>
    </>
  );
};

export default Categories;

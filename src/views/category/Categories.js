import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './categories.scss';
import { fetchCategories } from '../../store/category/categorySlice';
import DataTableListing from '../../components/table/DataTableListing';
import SubCatDataTableListing from '../../components/table/SubCatDataTableListing';
import { getsubcategories } from '../../store/subcategory/subcategorySlice';
import gif from '../../assets/images/gifs/scroll-down.gif';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const [categoryData, setcategoryData] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [categorycheck, setcategoryCheck] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
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
  }, [categories, subcategories]);

  // Effect to hide the sub-categories section after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);

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
          <SubCatDataTableListing pageName="sub categories" tableData={subCategoryData} parentData={categoryData} changeData={cateChanged} />
        </CardBody>
      </Card>
      <div className={`d-flex flex-column justify-content-center align-items-center sticky-bottom ${!isVisible ? 'd-none' : ''}`}>
        <p className='mb-0'>Sub Categories</p>
        <img className='mb-3' src={gif} height={50} width={50} alt="" />
      </div>
    </>
  );
};

export default Categories;

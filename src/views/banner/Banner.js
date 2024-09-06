import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import TableListing from '../../components/table/TableListing';
import { getBanners } from '../../store/banner/bannerSlice';

const Banner = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(state => state.banner);
  const [bannerData, setbannerData] = useState([]);
  const [bannerChange, setbannerChange] = useState(false);

  const bannerChanged = (e) => {
    setbannerChange(e);
  };

  useEffect(() => {
    dispatch(getBanners());
    setbannerChange(false);
  }, [dispatch, bannerChange]);

  useEffect(() => {
    if (banners?.success) {
      setbannerData(banners.banners);
    }
  }, [banners]);

  console.log(bannerData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardBody>
        <TableListing pageName="banner" tableData={bannerData} changeData={bannerChanged}/>
      </CardBody>
    </Card>
  );
};

export default Banner;

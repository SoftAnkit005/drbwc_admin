import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap";
import DataTableListing from "../../components/table/DataTableListing";
import { fetchOffers } from "../../store/coupons/couponSlice";

const Coupons = () => {
  const dispatch = useDispatch();
  const [couponChange, setcouponChange] = useState(false)
  const [couponData, setcouponData] = useState([])
  const { coupons, loading, error } = useSelector((state) => state.coupons);

  const bannerChanged = (e) => {
    setcouponChange(e);
  };

  console.log(couponChange);
  
  useEffect(() => {
    dispatch(fetchOffers());
    setcouponChange(false);
  }, [dispatch, couponChange]);

  useEffect(() => {
    if (coupons?.success) {
      setcouponData(coupons.offers);
    }
  }, [coupons]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="coupons" tableData={couponData} changeData={bannerChanged} />
      </CardBody>
    </Card>
  );
};

export default Coupons;

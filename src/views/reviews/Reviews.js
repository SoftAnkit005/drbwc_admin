import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './reviews.scss'; // Create a specific SCSS file for reviews if needed
import DataTableListing from '../../components/table/DataTableListing'; // Reuse the same DataTableListing component
// import { fetchReviews } from '../../store/reviews/reviewsSlice';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.reviews);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewsChange, setReviewsChange] = useState(false);

  const reviewsChanged = (e) => {
    setReviewsChange(e);
  };

  useEffect(() => {
    // dispatch(fetchReviews());
    setReviewsChange(false);
  }, [dispatch, reviewsChange]);

  useEffect(() => {
    if (reviews?.success) {
      setReviewsData(reviews.reviews);
    }
  }, [reviews]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="reviews" tableData={reviewsData} changeData={reviewsChanged} />
      </CardBody>
    </Card>
  );
};

export default Reviews;

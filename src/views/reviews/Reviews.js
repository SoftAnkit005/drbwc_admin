import { Card, CardBody } from 'reactstrap';
import './reviews.scss';
import DataTableListing from '../../components/table/DataTableListing';

const Reviews = () => {
  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="reviews"/>
      </CardBody>
    </Card>
  );
};

export default Reviews;

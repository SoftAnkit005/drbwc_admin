import { Card, CardBody } from 'reactstrap';
import './reviews.scss';
import TableListing from '../../components/table/TableListing';

const Reviews = () => {
  return (
    <Card>
      <CardBody>
        <TableListing pageName="reviews"/>
      </CardBody>
    </Card>
  );
};

export default Reviews;

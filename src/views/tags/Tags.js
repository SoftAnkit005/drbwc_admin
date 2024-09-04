import { Card, CardBody } from 'reactstrap';
import './tags.scss';
import TableListing from '../../components/table/TableListing';

const Tags = () => {
  return (
    <Card>
      <CardBody>
        <TableListing pageName="tags"/>
      </CardBody>
    </Card>
  );
};

export default Tags;

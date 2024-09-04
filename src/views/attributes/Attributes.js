import { Card, CardBody } from 'reactstrap';
import './attributes.scss';
import TableListing from '../../components/table/TableListing';

const Attributes = () => {
  return (
    <Card>
      <CardBody>
        <TableListing pageName="attributes"/>
      </CardBody>
    </Card>
  );
};

export default Attributes;

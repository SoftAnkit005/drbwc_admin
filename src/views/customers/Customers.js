import { Card, CardBody } from 'reactstrap';
import DataTableListing from '../../components/table/DataTableListing';

const Customers = () => {
  return (
    <Card>
      <CardBody>
        <DataTableListing />
      </CardBody>
    </Card>
  );
};

export default Customers;

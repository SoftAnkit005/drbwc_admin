import { Card, CardBody } from 'reactstrap';
import './tags.scss';
import DataTableListing from '../../components/table/DataTableListing';

const Tags = () => {
  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="tags"/>
      </CardBody>
    </Card>
  );
};

export default Tags;

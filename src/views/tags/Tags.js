import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import './tags.scss';
import DataTableListing from '../../components/table/DataTableListing';
import { fetchTags } from '../../store/tags/tagsSlice';

const Tags = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);
  const [tagsData, settagsData] = useState([]);
  const [tagsChange, settagsChange] = useState(false);

  const tagsChanged = (e) => {
    settagsChange(e);
  };

  useEffect(() => {
    dispatch(fetchTags());
    settagsChange(false);
  }, [dispatch, tagsChange]);

  useEffect(() => {
    if (tags?.success) {
      settagsData(tags.tags);
    }
  }, [tags]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardBody>
        <DataTableListing pageName="tags" tableData={tagsData} changeData={tagsChanged} />
      </CardBody>
    </Card>
  );
};

export default Tags;

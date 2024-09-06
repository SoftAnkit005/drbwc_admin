import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Badge, Input } from 'reactstrap';
import './table-style.scss';
import DeleteConfirmation from '../modal/DeleteConfirmation';
import AddEditCategory from '../modal/AddEditCategory';

const SubCatDataTableListing = ({ tableData = [], changeData, parentData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  // Log changeData for debugging
  console.log(changeData);

  // Filter tableData based on searchTerm
  useEffect(() => {
    if (Array.isArray(tableData)) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = tableData.filter((item) => 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(lowercasedSearchTerm)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]); // Make sure to update filteredData when tableData changes

  // Function to get parent category name
  const getParentName = (categoryId) => {
    const parentCategory = parentData.find(parent => parent.id === categoryId);
    return parentCategory ? parentCategory.name : 'Unknown';
  };

  // Table columns configuration
  const columns = [
    {
      name: 'Parent Name',
      selector: row => getParentName(row.category_id),
      sortable: true
    },
    { name: 'Sub Category Name', selector: row => row.name, sortable: true },
    {
      name: 'Status',
      selector: row => (
        <Badge color={row.status === 'active' ? 'success' : 'danger'}> {row.status} </Badge>
      ),
    },
    {
      name: 'Action',
      cell:row => (
        <div className='d-flex align-items-center'>
          <AddEditCategory field="sub_category" catType="edit" changed={changeData} allCategories={parentData} data={row}/>
          <DeleteConfirmation caseType="sub_categoreis" id={row.id} title={row.name} changed={changeData}/>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h4 className='text-capitalize mb-4 fw-semibold'>Sub Categories</h4>
      <div className="d-md-flex justify-content-between align-items-center mb-4">
        <Input
          className="w-fit"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}  // Use the columns array here directly
        data={filteredData} // Use filtered data here
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

// Add prop validation for pageName
SubCatDataTableListing.propTypes = {
  tableData: PropTypes.array,
  parentData: PropTypes.array,
  changeData: PropTypes.func,
};

export default SubCatDataTableListing;

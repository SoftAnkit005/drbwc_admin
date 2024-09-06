import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Badge, Button, Input } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";
import { DeleteTicket } from '../../store/apps/ticket/TicketSlice';
import './table-style.scss';
import AddEditProduct from '../modal/AddEditProduct';
import AddEditCategory from '../modal/AddEditCategory';
import AddEditTags from '../modal/AddEditTags';
import AddEditReviews from '../modal/AddEditReviews';
import AddAttributes from '../modal/AddAttributes';
import DeleteConfirmation from '../modal/DeleteConfirmation';
import AddEditBanner from '../modal/AddEditBanner';

const DataTableListing = ({ pageName, tableData = [], changeData }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  useEffect(() => {
    if (Array.isArray(tableData)) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      setFilteredData(
        tableData.filter((item) => {
          return Object.values(item)
            .some(value => 
              value && value.toString().toLowerCase().includes(lowercasedSearchTerm)
            );
        })
      );
    }
  }, [searchTerm, tableData]);

  // Determine table columns based on pageName
  const tableConfig = (() => {
    switch (pageName) {
      case 'products':
        return {
          columns: [
            {
              name: 'Thumbnail',
              selector: row => <img src={row.thumbnail} alt={row.product_name} width={50} />,
            },
            { name: 'Name', selector: row => row.product_name, sortable: true },
            { name: 'Price', selector: row => row.price, sortable: true },
            { name: 'Product Id', selector: row => row.id, sortable: true },
            { name: 'Stock', selector: row => row.qty, sortable: true },
            {
              name: 'Status',
              selector: row => (
                <Badge color={row.status === 'active' ? 'success' : 'danger'}>
                  {row.status}
                </Badge>
              ),
            },
            {
              name: 'Action',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditProduct prodtype="edit" changed={changeData} data={row}/>
                  <DeleteConfirmation caseType="products" id={row.id} title={row.product_name} changed={changeData}/>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditProduct prodtype="add" changed={changeData}/>,
        };
      case 'categories':
        return {
          columns: [
            { name: 'Category Name', selector: row => row.name, sortable: true },
            {
              name: 'Status',
              selector: row => (
                <Badge color={row.status === 'active' ? 'success' : 'danger'}>
                  {row.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
            {
              name: 'Action',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditCategory field="category" catType="edit" changed={changeData} allCategories={tableData} data={row}/>
                  <DeleteConfirmation caseType="categories" id={row.id} title={row.name} changed={changeData}/>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditCategory catType="add" changed={changeData} allCategories={tableData}/>,
        };
      case 'banner':
        return {
          columns: [
            { name: 'Banner Name', selector: row => row.title },
            { name: 'Image', selector: row => <img src={row.image_url} alt={row.image_name} width="50" height="50" /> },
            {
              name: 'Status',
              selector: row => (
                <Badge color={row.status === 'active' ? 'success' : 'danger'}>
                  {row.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
            {
              name: 'Action',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="banner" id={row.id} title={row.title} changed={changeData}/>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditBanner changed={changeData}/>,
        };
      case 'attributes':
        return {
          columns: [
            { name: 'Attribute Name', selector: row => row.name },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="attributes" id={row.id} title={row.name} changed={changeData}/>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddAttributes changed={changeData} />,
        };
      case 'tags':
        return {
          columns: [
            { name: 'Name', selector: row => row.name },
            { name: 'Products', selector: row => row.products },
            { name: 'Description', selector: row => row.description },
            {
              name: 'Status',
              selector: row => (
                <Badge color={row.status === 'Active' ? 'success' : 'danger'}>
                  {row.status}
                </Badge>
              ),
            },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <Button color="primary">Edit</Button>
                  <Button color="danger" onClick={() => dispatch(DeleteTicket(row.id))}> Delete </Button>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditTags />,
        };
      case 'reviews':
        return {
          columns: [
            { name: 'Name', selector: row => row.name },
            { name: 'Review', selector: row => row.review },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <Button color="primary">Edit</Button>
                  <Button color="danger" onClick={() => dispatch(DeleteTicket(row.id))}> Delete </Button>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditReviews />,
        };
      case 'orders':
        return {
          columns: [
            { name: 'Order Number', selector: row => row.order_prefix },
            { name: 'Date', selector: row => row.order_date },
            { name: 'Customer Email', selector: row => row.shipping_address },
            { name: 'Shipment Status', selector: row => row.status },
            { name: 'Payment Status', selector: row => row.total_amount },
            { name: 'Total Amount', selector: row => row.total_amount },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="orders" id={row.id} title={row.id} changed={changeData}/>
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditReviews />,
        };
      default:
        return {
          columns: [
            { name: 'Error', selector: () => 'No data available' },
          ],
          renderAdd: () => <></>,
        };
    }
  })();

  return (
    <div>
      <h4 className='text-capitalize mb-4 fw-semibold'>{pageName}</h4>
      <div className="d-md-flex justify-content-between align-items-center mb-4">
        <Input
          className="w-fit mb-3 mb-md-0"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {tableConfig.renderAdd()}
      </div>
      <DataTable
        columns={tableConfig.columns}
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
DataTableListing.propTypes = {
  pageName: PropTypes.string.isRequired,
  tableData: PropTypes.array,
  changeData: PropTypes.func,
};

export default DataTableListing;

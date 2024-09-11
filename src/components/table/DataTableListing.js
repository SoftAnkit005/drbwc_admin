import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Badge, Input } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";
import './table-style.scss';
import AddEditProduct from '../modal/AddEditProduct';
import AddEditCategory from '../modal/AddEditCategory';
import AddEditTags from '../modal/AddEditTags';
import AddEditReviews from '../modal/AddEditReviews';
import AddAttributes from '../modal/AddAttributes';
import DeleteConfirmation from '../modal/DeleteConfirmation';
import AddEditBanner from '../modal/AddEditBanner';
import AddEditFeaturedProduct from '../modal/AddEditFeaturedProduct';
import AddEditCouons from '../modal/AddEditCoupons';

const DataTableListing = ({ pageName, tableData = [], changeData }) => {
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

  // console.log(tableData);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Determine table columns based on pageName
  const tableConfig = (() => {
    switch (pageName) {
      case 'products':
        return {
          columns: [
            {
              name: 'Thumbnail',
              selector: row => <img className='my-2 rounded shadow-sm' src={JSON.parse(row.image_urls)[0]} alt={row.product_name} width={50} />,
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
                  <AddEditProduct prodtype="edit" changed={changeData} alldata={row} />
                  <DeleteConfirmation caseType="products" id={row.id} title={row.product_name} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditProduct prodtype="add" changed={changeData} />,
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
                  <AddEditCategory field="category" catType="edit" changed={changeData} allCategories={tableData} data={row} />
                  <DeleteConfirmation caseType="categories" id={row.id} title={row.name} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditCategory catType="add" changed={changeData} allCategories={tableData} />,
        };
        case 'banner':
          return {
            columns: [
              { name: 'Banner Name', selector: row => row.title },
              { name: 'description', selector: row => row.description },
              { name: 'Image', selector: row => <img src={row.image_url} alt='' width="50" height="50" className='m-2' /> },
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
                    <AddEditBanner bannerType="edit" changed={changeData} data={row} />
                    <DeleteConfirmation caseType="banner" id={row.id} title={row.title} changed={changeData} />
                  </div>
                ),
              },
            ],
            renderAdd: () => <AddEditBanner changed={changeData} />,
          };
      case 'featuredproduct':
        return {
          columns: [
            {
              name: 'Name',
              selector: row => row.type
            },
            {
              name: 'Description',
              selector: row => row.description
            },
            {
              name: 'Image', selector: row => <img src={row.image} alt='' width="50" height="50" />
            },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditFeaturedProduct featureproductType="edit" changed={changeData} data={row} />
                  <DeleteConfirmation
                    caseType="featuredproduct"
                    id={row.id}
                    title={row.type}
                    changed={changeData}
                  />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditFeaturedProduct changed={changeData} />,
        };

      case 'coupons':
        return {
          columns: [
            {
              name: 'Coupon Code',
              selector: row => row.offer_code
            },
            {
              name: 'Coupon Heading',
              selector: row => row.offer_name
            },
            {
              name: 'Discount Type',
              selector: row => row.discount_type
            },
            {
              name: 'Start Date',
              selector: row => formatDate(row.start_date)
            },
            {
              name: 'End Date',
              selector: row => formatDate(row.end_date)
            },
            {
              name: 'Status',
              selector: row => (
                <Badge color={row.status === 'active' ? 'success' : 'danger'}>
                  {row.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
            {
              name: 'Product Id',
              selector: row => row.product_id
            },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditCouons couponType="edit" changed={changeData} data={row}/>
                  <DeleteConfirmation caseType="coupons" id={row.id} title={row.offer_name} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditCouons couponType="add" changed={changeData} />,
        };

      case 'attributes':
        return {
          columns: [
            { name: 'Attribute Name', selector: row => row.name },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditFeaturedProduct featureproductType="edit" changed={changeData} data={row} />
                  <DeleteConfirmation caseType="attributes" id={row.id} title={row.name} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddAttributes changed={changeData} />,
        };
      case 'tags':
        return {
          columns: [
            { name: 'Name', selector: row => row.tags },
            { name: 'Products', selector: row => row.product_id },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditTags tagType="edit" changed={changeData} data={row} />
                  <DeleteConfirmation caseType="tags" id={row.id} title={row.tags} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditTags tagType="add" changed={changeData} />,
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
                  <AddEditReviews reviewType="edit" changed={changeData} data={row} />
                  <DeleteConfirmation caseType="reviews" id={row.id} title={row.name} changed={changeData} />
                </div>
              ),
            },
          ],
          renderAdd: () => <AddEditReviews reviewType="add" changed={changeData} />,
        };
      case 'users':
        return {
          columns: [
            { name: 'Name', selector: row => row.full_name },
            { name: 'Email', selector: row => row.email },
            { name: 'Role', selector: row => row.user_role },
            { name: 'Joined', selector: row => formatDate(row.createdAt) },
            {
              name: 'Actions',
              cell: row => (
                <div className='d-flex align-items-center'>
                  <AddEditReviews reviewType="edit" changed={changeData} data={row} />
                </div>
              ),
            },
          ],
          renderAdd: () => <></>,
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
                  <FaRegEdit className='text-dark cursor-pointer fs-5' />
                  <DeleteConfirmation caseType="orders" id={row.id} title={row.id} changed={changeData} />
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

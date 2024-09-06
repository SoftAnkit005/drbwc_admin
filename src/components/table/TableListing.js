import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Table, Input, Button, Badge } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";
import { fetchTickets, DeleteTicket, SearchTicket } from '../../store/apps/ticket/TicketSlice';
import './table-style.scss';
import AddEditProduct from '../modal/AddEditProduct';
import AddEditCategory from '../modal/AddEditCategory';
import AddEditTags from '../modal/AddEditTags';
import AddEditReviews from '../modal/AddEditReviews';
import AddAttributes from '../modal/AddAttributes';
import DeleteConfirmation from '../modal/DeleteConfirmation';
import AddEditBanner from '../modal/AddEditBanner';

const TableListing = ({ pageName, tableData, changeData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // const getVisibleTickets = (tickets, filter, ticketSearch) => {
  //   switch (filter) {
  //     case 'total_tickets':
  //       return tickets.filter(
  //         (c) => !c.deleted && c.ticketTitle.toLowerCase().includes(ticketSearch)
  //       );

  //     case 'Pending':
  //       return tickets.filter(
  //         (c) =>
  //           !c.deleted &&
  //           c.Status === 'Pending' &&
  //           c.ticketTitle.toLowerCase().includes(ticketSearch)
  //       );

  //     case 'Closed':
  //       return tickets.filter(
  //         (c) =>
  //           !c.deleted &&
  //           c.Status === 'Closed' &&
  //           c.ticketTitle.toLowerCase().includes(ticketSearch)
  //       );

  //     case 'Open':
  //       return tickets.filter(
  //         (c) =>
  //           !c.deleted &&
  //           c.Status === 'Open' &&
  //           c.ticketTitle.toLowerCase().includes(ticketSearch)
  //       );

  //     default:
  //       throw new Error(`Unknown filter: ${filter}`);
  //   }
  // };

  // const tickets = useSelector((state) =>
  //   getVisibleTickets(
  //     state.ticketReducer.tickets,
  //     state.ticketReducer.currentFilter,
  //     state.ticketReducer.ticketSearch
  //   )
  // );

  // Handle checkbox change for individual ticket
  // const handleCheckboxChange = (ticketId) => {
  //   if (selectedTickets.includes(ticketId)) {
  //     setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
  //   } else {
  //     setSelectedTickets([...selectedTickets, ticketId]);
  //   }
  // };

  // Handle delete selected tickets
  // const handleDeleteSelected = () => {
  //   selectedTickets.forEach((ticketId) => {
  //     dispatch(DeleteTicket(ticketId));
  //   });
  //   setSelectedTickets([]); // Clear selected tickets after deletion
  // };

  // Handle select/deselect all
  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     const allTicketIds = tickets.map((ticket) => ticket.Id);
  //     setSelectedTickets(allTicketIds);
  //   } else {
  //     setSelectedTickets([]);
  //   }
  // };

  // Determine table headings and row data based on pageName
  const tableConfig = (() => {
    switch (pageName) {
      case 'products':
        return {
          headings: ['Thumbnail', 'Name', 'Price', 'Product Id', 'Stock', 'Status', 'Action'],
          renderRow: (item) => (
            <>
              <td>
                <img src={item.thumbnail} alt={item.product_name} width={50} />
              </td>
              <td>{item.product_name}</td>
              <td>{item.price}</td>
              <td>{item.id}</td>
              <td>{item.qty}</td>
              <td>
                <Badge color={item.status === 'active' ? 'success' : 'danger'} className="text-capitalize">
                  {item.status}
                </Badge>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <AddEditProduct prodtype="edit" changed={changeData} data={item}/>
                  <DeleteConfirmation caseType="products" id={item.id} title={item.product_name} changed={changeData}/>
                </div>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditProduct prodtype="add" changed={changeData}/>
          ),
        };
      case 'categories':
        return {
          headings: ['Category Name', 'Status', 'Action'],
          renderRow: (item) => (
            <>
            {console.log(item)}
              <td>{item.name}</td>
              <td>
                <Badge color={item.status !== 'inactive' ? 'success' : 'danger'}>
                  {(item.status !== 'inactive') ? 'Acive' : 'InActice'}
                </Badge>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="categories" id={item.id} title={item.name} changed={changeData}/>
                </div>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditCategory changed={changeData} allCategories={tableData} />
          ),
        };
      case 'banner':
        return {
          headings: ['Banner Name','Image', 'Status','Action'],
          renderRow: (item) => (
            <>
              <td>{item.title}</td>
              <td><img src={item.image_url} alt={item.image_name} width="50" height="50" /></td>
              <td>
                <Badge color={item.status === 'active' ? 'success' : 'danger'}>
                  {(item.status === 'active') ? 'Active' : 'InActice'}
                </Badge>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="banner" id={item.id} title={item.title} changed={changeData}/>
                </div>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditBanner changed={changeData}/>
          ),
        };
      case 'attributes':
        return {
          headings: ['Attribute Name', 'Actions'],
          renderRow: (item) => (
            <>
              <td>{item.name}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="attributes" id={item.id} title={item.name} changed={changeData}/>
                </div>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddAttributes changed={changeData} />
          ),
        };
      case 'tags':
        return {
          headings: ['Name', 'Products', 'Actions'],
          renderRow: (item) => (
            <>
              <td>{item.no}</td>
              <td>{item.category_name}</td>
              <td>{item.description}</td>
              <td>
                <Badge color={item.status === 'Active' ? 'success' : 'danger'}>
                  {item.status}
                </Badge>
              </td>
              <td>
                <Button color="primary">Edit</Button>
                <Button color="danger" onClick={() => dispatch(DeleteTicket(item.id))}> Delete </Button>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditTags />
          ),
        };
      case 'reviews':
        return {
          headings: ['Name', 'Review', 'Actions'],
          renderRow: (item) => (
            <>
              <td>{item.no}</td>
              <td>{item.category_name}</td>
              <td>{item.description}</td>
              <td>
                <Badge color={item.status === 'Active' ? 'success' : 'danger'}> {item.status} </Badge>
              </td>
              <td>
                <Button color="primary">Edit</Button>
                <Button color="danger" onClick={() => dispatch(DeleteTicket(item.id))}> Delete </Button>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditReviews />
          ),
        };
      case 'orders':
        return {
          headings: ['Order Number','Date','Customer Email', 'Shipment Status','Payment Status','Total Amount','Actions'],
          renderRow: (item) => (
            <>
              <td>{item.order_prefix}</td>
              <td>{item.order_date}</td>
              <td>-</td>
              <td>-</td>
              <td>
                <Badge color={item.status === 'success' ? 'success' : 'danger'}> {item.status} </Badge>
              </td>
              <td>{item.total_amount}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <FaRegEdit className='text-dark cursor-pointer fs-5'/>
                  <DeleteConfirmation caseType="attributes" id={item.id} title={item.name} changed={changeData}/>
                </div>
              </td>
            </>
          ),
          renderAdd: () => (
            <AddEditReviews />
          ),
        };
      // Add more cases as needed
      default:
        return {
          headings: ['Thumbnail', 'Name', 'Price', 'Product Id', 'Stock', 'Status', 'Action'],
          renderRow: () => (
            <>
              <td>Something went wrong</td>
            </>
          ),
          renderAdd: () => (
            <></>
          ),
        };
    }
  })();

  return (
    <div>
      <h4 className='text-capitalize mb-4 fw-semibold'>{pageName}</h4>
      <div className="d-md-flex justify-content-between align-items-center">
        <Input className="w-fit mb-4" type="text" onChange={(e) => dispatch(SearchTicket(e.target.value))} placeholder="Search Ticket..." />
        {tableConfig.renderAdd()}
      </div>
      {/* <Button color="danger" className={`mb-3 ${selectedTickets.length === 0 ? 'd-none' : ''}`} onClick={handleDeleteSelected} >
        Delete Selected
      </Button> */}
      <Table className="align-middle">
        <thead>
          <tr>
            {/* <th>
              <Input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedTickets.length === tickets.length && tickets.length > 0}
              />
            </th> */}

            {tableConfig.headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item) => (
            <tr key={item.id}>
              {/* <td>
                <Input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedTickets.includes(item.id)} />
              </td> */}
              {tableConfig.renderRow(item)}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Add prop validation for pageName
TableListing.propTypes = {
  pageName: PropTypes.string.isRequired,
  tableData: PropTypes.array,
  changeData: PropTypes.func,
};

export default TableListing;

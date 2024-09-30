import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import './modalstyle.scss';
import { updateOrder } from '../../store/orders/ordersSlice';

const staticOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'awaiting-pickup', label: 'Awaiting pickup' },
  { value: 'pick-up', label: 'Pick Up' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'completed', label: 'Completed' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'declined', label: 'Declined' },
];

function EditTrackingId({ order, trackType }) {
  const [modal, setModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState(order.comments || ''); // Initialize with order comments
  const [selectedStatus, setSelectedStatus] = useState(order.status || ''); // Initialize with order status
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleSave = () => {
    if (selectedStatus && deliveryData) {
      // Dispatch the updateOrder action with the order ID, status, and comments
      dispatch(updateOrder({
        orderId: order.id,
        status: selectedStatus,
        comments: deliveryData,
      }));
    }

    toggle();
  };

  return (
    <div>
      <FaRegEdit className='text-dark cursor-pointer fs-4' onClick={toggle} />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>
          {trackType !== 'add' ? 'Edit' : 'Add'} Tracking Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody className="p-0">
                  <Row>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="d_status">Delivery Status</Label>
                        <Input
                          type="select"
                          id="d_status"
                          name="d_status"
                          value={selectedStatus}  // Bind selectedStatus state
                          onChange={(e) => setSelectedStatus(e.target.value)} // Update selectedStatus state
                        >
                          <option value="">Select...</option>
                          {staticOptions?.map((partner, i) => (
                            <option key={i} value={partner.value}>
                              {partner.label}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="deliveryDetails">Delivery Details</Label>
                        <Input
                          type="textarea"
                          id="deliveryDetails"
                          placeholder="Enter Details"
                          value={deliveryData} // Bind deliveryData state
                          onChange={(e) => setDeliveryData(e.target.value)} // Update deliveryData state
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

EditTrackingId.propTypes = {
  order: PropTypes.object.isRequired, // Ensure that the order object is required
  trackType: PropTypes.string.isRequired, // Ensure trackType is required
};

export default EditTrackingId;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, Form, CardTitle } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import Select from 'react-select';
import './modalstyle.scss';
// import { fetchProducts } from '../../store/products/productSlice';
import { createOffers, updateOffers } from '../../store/coupons/couponSlice';

function AddEditCoupons({ couponType, changed, data }) {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modal, setModal] = useState(false);

  // State for form fields
  const [heading, setHeading] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isEntireOrder, setIsEntireOrder] = useState(true);
  const [isFixedDiscount, setIsFixedDiscount] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');

  const toggle = () => setModal(!modal);

  // console.log(data);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // dispatch(fetchProducts());
    setSelectedProducts([]);
  }, [dispatch]);

  useEffect(() => {
    if (products?.success && products?.products) {
      const formattedOptions = products.products.map((product) => ({
        value: product.id.toString(),
        label: product.product_name,
      }));
      setOptions(formattedOptions);
    }
  }, [products]);

  const handleProductTypeChange = (value) => {
    setIsEntireOrder(value);
    if (value) {
      setSelectedProducts([]); // Clear selected products if Entire Order is selected
    }
  };

   // Prefill form when editing
   useEffect(() => {
    if (products?.success && products?.products) {
      const formattedOptions = products.products.map((product) => ({
        value: product.id.toString(),
        label: product.product_name,
      }));
      setOptions(formattedOptions);

      if (couponType === 'edit' && data) {
        // Pre-fill form data for editing
        setHeading(data.offer_name || '');
        setCode(data.offer_code || '');
        setDescription(data.offer_description || '');
        setIsEntireOrder(data.offer_type === 'code');
        setIsFixedDiscount(data.discount_type === 'fixed');
        setAmount(data.discount_value || '');
        setStartDate(data.start_date.split('T')[0] || '');
        setEndDate(data.end_date.split('T')[0] || '');
        setProductState(data.status === 'active');

        // Pre-select products if offer_type is 'product'
        if (data.offer_type === 'product' && data.product_id) {
          const selectedProductIds = JSON.parse(data.product_id); // Parse product_id to array
          const selectedOptions = formattedOptions.filter(option =>
            selectedProductIds.includes(parseInt(option.value, 10))
          );
          setSelectedProducts(selectedOptions);
        }
      }
    }
  }, [products, couponType, data]);

  const handleSubmit = () => {

    const formData = {
      offer_name: heading,
      offer_description: description,
      offer_type: isEntireOrder ? "code" : "product", // Correct value for offer_type
      product_id: isEntireOrder ? "[]" : `[${selectedProducts.map(option => option.value).join(',')}]`,
      discount_type: isFixedDiscount ? "fixed" : "percentage",
      start_date: startDate,
      end_date: endDate,
      status: productState ? "active" : "inactive",
      offer_code: code,
      discount_value: amount
    };
  
    if(couponType !== 'edit') {
      dispatch(createOffers(formData));
    } else {
      console.log({ offerId: data.id, ...formData });
      dispatch(updateOffers({ offerId: data.id, offerData: formData }));
    }
    changed(true);
    // toggle();
  };

  return (
    <div>
      {couponType !== 'edit' ? 
        <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
          Add Coupon
        </Button>
        :
        <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle}/>
      }
      <Modal size="xl" isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>
          {couponType === 'edit' ? 'Edit Coupon' : 'Add Coupon'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <CardTitle className="d-flex justify-content-end">
                <FormGroup switch>
                    <Input type="switch" defaultChecked={productState} onClick={() => setProductState(!productState)} />
                </FormGroup>
            </CardTitle>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody className="p-0">
                    <Row>
                      <Col className="py-1" md="6">
                        <FormGroup>
                          <Label htmlFor="heading">Coupon Heading</Label>
                          <Input
                            type="text"
                            id="heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            placeholder="Enter Heading"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6">
                        <FormGroup>
                          <Label htmlFor="code">Coupon Code</Label>
                          <Input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter Code"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="description">Coupon Description</Label>
                          <Input
                            type="textarea"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label>Product Type</Label>
                          <FormGroup className="d-flex align-items-center">
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="proddisc1"
                                name="prodDiscType"
                                value="true"
                                checked={isEntireOrder}
                                onChange={() => handleProductTypeChange(true)}
                              />
                              <Label htmlFor="proddisc1" check>Entire Order</Label>
                            </FormGroup>
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="proddisc2"
                                name="prodDiscType"
                                value="false"
                                checked={!isEntireOrder}
                                onChange={() => handleProductTypeChange(false)}
                              />
                              <Label htmlFor="proddisc2" check>Specific Products</Label>
                            </FormGroup>
                          </FormGroup>
                          <Label>Discount Type</Label>
                          <FormGroup className="d-flex align-items-center">
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="disc1"
                                name="discType"
                                value="true"
                                checked={isFixedDiscount}
                                onChange={() => setIsFixedDiscount(true)}
                              />
                              <Label htmlFor="disc1" check>Fixed discount</Label>
                            </FormGroup>
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="disc2"
                                name="discType"
                                value="false"
                                checked={!isFixedDiscount}
                                onChange={() => setIsFixedDiscount(false)}
                              />
                              <Label htmlFor="disc2" check>Percentage discount</Label>
                            </FormGroup>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      {!isEntireOrder && ( // Show only if "Specific Products" is selected
                        <Col className="py-1" xs="12">
                          <FormGroup>
                            <Label htmlFor="products">Choose Products</Label>
                            <Select
                              closeMenuOnSelect={false}
                              options={options}
                              isMulti
                              value={selectedProducts}
                              onChange={(selected) => setSelectedProducts(selected)}
                            />
                          </FormGroup>
                        </Col>
                      )}
                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="amount">Amount/Percentage</Label>
                          <Input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isFixedDiscount && value > 100) {
                                setAmount(100); // If percentage is selected, set max value to 100
                              } else {
                                setAmount(e.target.value);
                              }
                            }}
                            placeholder="Enter Amount/Percentage"
                            min="0"
                            max={!isFixedDiscount ? "100" : undefined} // Max 100 if percentage is selected
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="end_date">End Date</Label>
                          <Input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalFooter>
              <Button color="dark" onClick={toggle}>
                Cancel
              </Button>
              <Button color="success" onClick={handleSubmit}>
                {couponType === 'edit' ? 'Edit' : 'Add'}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

AddEditCoupons.propTypes = {
  couponType: PropTypes.string,
  changed: PropTypes.func,
  data: PropTypes.object,
};

export default AddEditCoupons;

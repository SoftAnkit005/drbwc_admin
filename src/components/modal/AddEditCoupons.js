import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, Form, CardTitle, Table } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import Select from 'react-select';
import './modalstyle.scss';
// import { fetchProducts } from '../../store/products/productSlice';
import { createOffers, updateOffers } from '../../store/coupons/couponSlice';
import { fetchProducts } from '../../store/products/productSlice';


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
  const [minQty, setMinQty] = useState('');
  const [amount, setAmount] = useState('');
  const [isQuantityProducts, setIsQuantityProducts] = useState(false); // New state for quantity products
  const [addedProducts, setAddedProducts] = useState([]);

  const toggle = () => setModal(!modal);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
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

  // console.log('isEntireOrder:', isEntireOrder);

  const handleProductTypeChange = (value) => {
    setIsEntireOrder(value === 'entire');
    setIsQuantityProducts(value === 'quantity'); // Set the new state

    if (value === 'entire') {
      setSelectedProducts([]); // Clear selected products if Entire Order is selected
    }

    if (value === 'quantity') {
      setIsFixedDiscount(false); // Default to Percentage Discount
    }

    if (value === 'specific') {
        dispatch(fetchProducts());
    }
  };
   // Prefill form when editing
   useEffect(() => {
    // Ensure products are fetched and available
    if (products?.success && products?.products) {
      const formattedOptions = products.products.map((product) => ({
        value: product.id.toString(),
        label: product.product_name,
      }));
      setOptions(formattedOptions);
      
      // Check if we're editing
      if (couponType === 'edit' && data) {
        console.log("Editing Coupon Data: ", data); // Debugging line to check the data

        // Pre-fill form fields
        setHeading(data.offer_name || '');
        setCode(data.offer_code || '');
        setDescription(data.offer_description || '');
        setIsEntireOrder(data.offer_type === 'code');
        setIsFixedDiscount(data.discount_type === 'fixed');
        setAmount(data.discount_value || '');
        setStartDate(data.start_date ? data.start_date.split('T')[0] : ''); // Ensure valid date
        setEndDate(data.end_date ? data.end_date.split('T')[0] : ''); // Ensure valid date
        setProductState(data.status === 'active');

        // Pre-select products for specific offer type
        if (data.offer_type === 'product' && data.product_id) {
          const selectedProductIds = JSON.parse(data.product_id);
          const selectedOptions = formattedOptions.filter(option =>
            selectedProductIds.includes(parseInt(option.value, 10))
          );
          setSelectedProducts(selectedOptions);
        }

        // Check for Quantity Products
        if (data.discount_type === 'percentage' && data.qty) {
          const qtyArray = JSON.parse(data.qty);
          const discountValueArray = JSON.parse(data.discount_value);
          setIsQuantityProducts(true);

          // Ensure both arrays exist and are of the same length
          if (Array.isArray(qtyArray) && Array.isArray(discountValueArray) && qtyArray.length === discountValueArray.length) {
            const newAddedProducts = qtyArray.map((qty, index) => ({
              productType: 'Quantity Products',
              discountType: 'Percentage Discount',
              amount: discountValueArray[index],
              startDate: data.start_date.split('T')[0],
              endDate: data.end_date.split('T')[0],
              minQty: qty
            }));
            setAddedProducts(newAddedProducts);
          }
        }
      }
    }
  }, [products, couponType, data]);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (selectedProducts.length === 0 && !isEntireOrder) {
      cogoToast.warn('Please select at least one product.', { position: 'top-right' });
      return;
    }
  
    // Prepare qty and discount_value arrays if Product Type is Quantity Products
    const qty = [];
    const discountValue = [];
  
    if (isQuantityProducts) {
      addedProducts.forEach(product => {
        qty.push(product.minQty);  // Collecting minQty for qty
        discountValue.push(product.amount);  // Collecting amount for discount_value
      });
    }
  
    const formData = {
      offer_name: heading,
      offer_description: description,
      offer_type: (isEntireOrder || isQuantityProducts ) ? "code" : "product",
      qty: isQuantityProducts ? `[${qty.join(',')}]` : "[]", // Use qty if Quantity Products
      product_id: isEntireOrder ? "[]" : `[${selectedProducts.map(option => option.value).join(',')}]`,
      discount_type: isQuantityProducts ? "percentage" : (isFixedDiscount ? "fixed" : "percentage"),
      discount_value: isQuantityProducts ? `[${discountValue.join(',')}]` : amount, // Use discount_value if Quantity Products
      start_date: startDate,
      end_date: endDate,
      status: productState ? "active" : "inactive",
      offer_code: code
    };
  
    if (couponType !== 'edit') {
      dispatch(createOffers(formData));
    } else {
      console.log({ offerId: data.id, ...formData });
      dispatch(updateOffers({ offerId: data.id, offerData: formData }));
    }
    changed(true);
    // toggle();
  };
  

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      productType: isEntireOrder ? 'Entire Order' : isQuantityProducts ? 'Quantity Products' : 'Specific Products',
      discountType: isFixedDiscount ? 'Fixed Discount' : 'Percentage Discount',
      amount,
      startDate,
      endDate,
      minQty, // Include minimum quantity
    };
    setAddedProducts([...addedProducts, newProduct]);
  
    // Reset form fields after adding the product
    setAmount('');
    setIsEntireOrder(true);
    setMinQty(''); // Reset minQty
    setSelectedProducts([]);
  };
  

  const handleTableDeleteProduct = (indexToDelete) => {
    const updatedProducts = addedProducts.filter((_, index) => index !== indexToDelete);
    setAddedProducts(updatedProducts);
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
          <Form onSubmit={handleSubmit}>
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
                          <Label htmlFor="heading" className="required">Coupon Heading</Label>
                          <Input
                            type="text"
                            id="heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            placeholder="Enter Heading"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6">
                        <FormGroup>
                          <Label htmlFor="code" className="required">Coupon Code</Label>
                          <Input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter Code"
                            required
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
                                value="entire"
                                checked={isEntireOrder}
                                onChange={() => handleProductTypeChange('entire')}
                              />
                              <Label htmlFor="proddisc1" check>Entire Order</Label>
                            </FormGroup>
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="proddisc2"
                                name="prodDiscType"
                                value="specific"
                                checked={!isEntireOrder && !isQuantityProducts}
                                onChange={() => handleProductTypeChange('specific')}
                              />
                              <Label htmlFor="proddisc2" check>Specific Products</Label>
                            </FormGroup>
                            <FormGroup check className="me-2">
                              <Input
                                type="radio"
                                id="proddisc3"
                                name="prodDiscType"
                                value="quantity"
                                checked={isQuantityProducts}
                                onChange={() => handleProductTypeChange('quantity')}
                              />
                              <Label htmlFor="proddisc3" check>Quantity Products</Label>
                            </FormGroup>
                          </FormGroup>
                          <Label>Discount Type</Label>
                          <FormGroup className="d-flex align-items-center">
                            {!isQuantityProducts && 
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
                            }
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
                      {!isEntireOrder && !isQuantityProducts && (
                        <Col className="py-1" xs="12">
                          <FormGroup>
                            <Label htmlFor="products" className="required">Choose Products</Label>
                            <Select
                              closeMenuOnSelect={false}
                              options={options}
                              isMulti
                              value={selectedProducts}
                              onChange={(selected) => setSelectedProducts(selected)}
                            />
                            {selectedProducts.length === 0 && (
                              <div className="text-danger">Please select at least one product</div>
                            )}
                          </FormGroup>
                        </Col>
                      )}

                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="amount" className="required">Amount/Percentage</Label>
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
                            required={addedProducts.length <= 0}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="start_date" className="required">Start Date</Label>
                          <Input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="end_date" className="required">End Date</Label>
                          <Input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      {isQuantityProducts && (
                        <>
                        <Col className="py-1" md="6" lg="4">
                          <FormGroup>
                            <Label htmlFor="end_date">Min Quantity</Label>
                            <Input
                              type="number"
                              id="min_qty"
                              name="min_qty"
                              value={minQty}
                              onChange={(e) => setMinQty(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="py-1" xs="12">
                          <FormGroup>
                            <Button color="info" onClick={handleAddProduct}> Add </Button>
                          </FormGroup>
                        </Col>
                        </>
                      )}

                      {addedProducts.length > 0 && (
                        <Col xs="12">
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>Product Type</th>
                                <th>Discount Type</th>
                                <th>Percentage</th>
                                {/* <th>Start Date</th>
                                <th>End Date</th> */}
                                <th>Min Quantity</th> {/* New column for min quantity */}
                                <th>Actions</th> {/* Column for delete button */}
                              </tr>
                            </thead>
                            <tbody>
                              {addedProducts.map((product, index) => (
                                <tr key={index}>
                                  <td>{product.productType}</td>
                                  <td>{product.discountType}</td>
                                  <td>{product.amount}</td>
                                  {/* <td>{startDate}</td>
                                  <td>{endDate}</td> */}
                                  <td>{product.minQty || 'N/A'}</td> {/* Show min quantity or 'N/A' if not applicable */}
                                  <td>
                                    <i className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" onClick={() => handleTableDeleteProduct(index)} />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      )}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalFooter>
              <Button color="dark" onClick={toggle}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                {couponType === 'edit' ? 'Update' : 'Add'}
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

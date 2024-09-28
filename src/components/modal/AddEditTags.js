import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, Form } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import './modalstyle.scss';
import Select from 'react-select';
import { fetchProducts } from '../../store/products/productSlice';
import { addTags, updateTags } from '../../store/tags/tagsSlice'; // Import updateTags

function AddEditTags({ changed, tagType, data }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [tagName, setTagName] = useState(""); // State for tag name
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const [productError, setProductError] = useState(false); // State to track validation error
  const toggle = () => setModal(!modal);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
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

  useEffect(() => {
    if (tagType === 'edit' && data) {
      setTagName(data.tags); // Set tag name for editing
      const selectedOptions = data.product_id.split(',').map(id => ({
        value: id,
        label: options.find(option => option.value === id)?.label || 'Unknown'
      }));
      setSelectedProducts(selectedOptions);
    }
  }, [tagType, data, options]);

  const handleSave = (e) => {
    e.preventDefault();

    // Check if any products are selected
    if (selectedProducts.length === 0) {
      setProductError(true);
      return;
    }

    const productIds = selectedProducts.map(product => product.value).join(','); // Get product IDs as a comma-separated string

    const formData = { tags: tagName, product_id: productIds };

    if (tagType === 'edit') {
      dispatch(updateTags({ id: data.id, ...formData })); // Dispatch updateTags when editing
    } else {
      dispatch(addTags(formData));
    }

    changed(true);
    toggle();
  };

  return (
    <div>
      {tagType !== 'edit' ? 
          <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
              Add Tag
          </Button>
          :
          <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle}/>
      }
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>{tagType !== 'add' ? 'Edit' : 'Add'} Tag</ModalHeader>
        <Form onSubmit={handleSave}>
          <ModalBody>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody className="p-0">
                    <Row>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="name" className="required">Name</Label>
                          <Input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            value={tagName}            // Bind tag name state
                            onChange={(e) => setTagName(e.target.value)} // Update tag name state
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="position" className="required">Choose Products</Label>
                          <Select
                            closeMenuOnSelect={false}
                            options={options}
                            isMulti
                            value={selectedProducts}   // Bind selected products state
                            onChange={(selected) => {
                              setSelectedProducts(selected);
                              if (selected.length > 0) setProductError(false); // Remove error on valid selection
                            }} // Update selected products state
                          />
                          {productError && <span className="text-danger">Please select at least one product.</span>} {/* Show error message */}
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
            <Button color="success" type="submit">
              {tagType !== 'add' ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

AddEditTags.propTypes = {
    changed: PropTypes.func,
    tagType: PropTypes.string,
    data: PropTypes.object,
};

export default AddEditTags;

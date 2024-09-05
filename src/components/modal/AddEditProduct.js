import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import './modalstyle.scss';
import FileDropZone from '../uploader/FileDropZone';
import { addProduct } from '../../store/products/productSlice';

function AddEditProduct({changed, prodtype, data}) {
  const [modal, setModal] = useState(false);
  const [productState, setProductState] = useState(true);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    price: '',
    image_urls: [],
    qty: '',
    category_id: '',

    subcategory_id: 1,
    attribute_id: 2,
    variant_id: 3,
    
    video_link: '',
    amazon_link: '',
    flipkart_link: '',
    status: 'active',
    visibility: 'public',
  });

  useEffect(() => {
    if (prodtype === "edit") {
      setFormData({
        ...formData,
        ...data,
      });
      setProductState(data.status === 'active');
    }
  }, [prodtype, data]);

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    changed(true);
    toggle()
  };


  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      product_description: e.data
    });
  };

  const handleStatusChange = () => {
    setFormData({
      ...formData,
      status: productState !== true ? 'active' : 'inactive'
    });
  };

  // const handleStockChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     stock_available: e.target.value === 'true'
  //   });
  // };

  

  const prodImages = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      image_urls: e
    });
  }

  return (
    <div>
      {prodtype === 'add'?
        <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
          Add Product
        </Button>
        :
        <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle}/>
      }
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader className="bg-primary text-white px-xl-5" toggle={toggle}>{prodtype === 'add'?'Add':'Edit'} Product</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle className="border-bottom">
                  <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h4 className='m-0 fw-semibold'>General</h4>
                    <div className='d-flex align-items-center'>
                      <Label className="m-0 me-2">Status</Label>
                      <FormGroup switch>
                        <Input type="switch" defaultChecked={productState} onClick={() => { setProductState(!productState); handleStatusChange(!productState) }} />
                      </FormGroup>
                    </div>
                  </div>
                </CardTitle>
                <CardBody>
                  <Row>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="product_name">Name</Label>
                        <Input type="text" id="product_name" name="product_name" placeholder="Name" value={formData.product_name} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="price">Price</Label>
                        <Input type="text" id="price" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="use_for">Use For</Label>
                        <Input type="text" id="use_for" name="use_for" placeholder="Use For" value={formData.use_for} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="power_source">Power Source</Label>
                        <Input type="text" id="power_source" name="power_source" placeholder="Power Source" value={formData.power_source} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="material">Material</Label>
                        <Input type="text" id="material" name="material" placeholder="Material" value={formData.material} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="item_weight">Item Weight</Label>
                        <Input type="text" id="item_weight" name="item_weight" placeholder="Item Weight" value={formData.item_weight} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="color">Color</Label>
                        <Input type="text" id="color" name="color" placeholder="Color"/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1">
                      <FormGroup>
                        <Label htmlFor="about_item">About this item</Label>
                        <Input type="textarea" id="about_item" name="about_item" placeholder="About this item" value={formData.about_item} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="video_link">Video Link</Label>
                        <Input type="text" id="video_link" name="video_link" placeholder="Video Link" value={formData.video_link} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="amazon_link">Amazon Link</Label>
                        <Input type="text" id="amazon_link" name="amazon_link" placeholder="Amazon Link" value={formData.amazon_link} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="flipkart_link">Flipkart Link</Label>
                        <Input type="text" id="flipkart_link" name="flipkart_link" placeholder="Flipkart Link" value={formData.flipkart_link} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <Input type="select" id="category" name="category_id" value={formData.category_id} onChange={handleChange}>
                          <option>Select...</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="tax_class">Tax Class</Label>
                        <Input type="select" id="tax_class" name="tax_class">
                          <option>Select...</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <CKEditorComponent getDescription={handleDescriptionChange}/>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                            <Label>Stock Availability</Label>
                            <FormGroup className="d-flex align-items-center">
                                <FormGroup check className="me-2">
                                    <Input type="radio" id="stock1" name="stock" value="true" />
                                    <Label htmlFor="stock1" check>Yes</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" id="stock0" name="stock" value="false" />
                                    <Label htmlFor="stock0" check>No</Label>
                                </FormGroup>
                            </FormGroup>
                        <FormGroup>
                          <Input type="text" id="qty" name="qty" placeholder="Quantity" value={formData.qty} onChange={handleChange} />
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <ComponentCard title="Media">
                <Row>
                  <Col className="py-1" xs="12">
                    <FormGroup>
                      <FileDropZone prodImages={prodImages}/>
                    </FormGroup>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <ComponentCard title="Attributes">
                <Row>
                  <Col className="py-1" md="6" lg="4" xl="3">
                    <FormGroup>
                      <Label htmlFor="size">Size</Label>
                      <Input type="select" id="size" name="size">
                        <option>Select...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4" xl="3">
                    <FormGroup>
                      <Label htmlFor="color_attr">Color</Label>
                      <Input type="select" id="color_attr" name="color_attr">
                        <option>Select...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>              
          <Row>
            <Col md="12">
              <ComponentCard title="Search Engine Optimization">
                <Row>
                  <Col className="py-1" xs="12">
                    <FormGroup>
                      <Label htmlFor="url_key">Url Key</Label>
                      <Input type="text" id="url_key" name="url_key" placeholder="Url Key"/>
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_title">Meta title</Label>
                      <Input type="text" id="meta_title" name="meta_title" placeholder="Meta title" />
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_keywords">Meta keywords</Label>
                      <Input type="text" id="meta_keywords" name="meta_keywords" placeholder="Meta keywords" />
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_description">Meta description</Label>
                      <Input type="text" id="meta_description" name="meta_description" placeholder="Meta description" />
                    </FormGroup>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="px-5">
          <Button color="dark" onClick={toggle}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

AddEditProduct.propTypes = {
  changed: PropTypes.func,
  data: PropTypes.object,
  prodtype: PropTypes.string,
};
export default AddEditProduct;

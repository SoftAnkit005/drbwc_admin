import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import './modalstyle.scss';
import FileDropZone from '../uploader/FileDropZone';

function AddEditProduct() {
  const [modal, setModal] = useState(false);
  const [productState, setProductState] = useState(true);
  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    use_for: '',
    power_source: '',
    material: '',
    item_weight: '',
    brand: '',
    color: '',
    about_item: '',
    video_link: '',
    amazon_link: '',
    flipkart_link: '',
    category: '',
    tax_class: '',
    description: '',
    stock_available: true,
    quantity: '',
    size: '',
    color_attr: '',
    url_key: '',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    image_urls: [] // You can handle this with the FileDropZone component
  });

//   console.log(formData);


  
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
      description: e.data
    });
  };

  const handleStockChange = (e) => {
    setFormData({
      ...formData,
      stock_available: e.target.value === 'true'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    toggle(); // Close modal after submission
  };

  return (
    <div>
      <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
        Add Product
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader className="bg-primary text-white px-xl-5" toggle={toggle}>Add Product</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle className="border-bottom">
                  <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h4 className='m-0 fw-semibold'>General</h4>
                    <FormGroup switch>
                      <Input type="switch" defaultChecked={productState} onClick={() => { setProductState(!productState); }} />
                    </FormGroup>
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
                        <Input type="text" id="use_for" name="use_for" placeholder="Use For" value={formData.use_for} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="power_source">Power Source</Label>
                        <Input type="text" id="power_source" name="power_source" placeholder="Power Source" value={formData.power_source} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="material">Material</Label>
                        <Input type="text" id="material" name="material" placeholder="Material" value={formData.material} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="item_weight">Item Weight</Label>
                        <Input type="text" id="item_weight" name="item_weight" placeholder="Item Weight" value={formData.item_weight} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="brand">Brand</Label>
                        <Input type="text" id="brand" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="color">Color</Label>
                        <Input type="text" id="color" name="color" placeholder="Color" value={formData.color} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="py-1">
                      <FormGroup>
                        <Label htmlFor="about_item">About this item</Label>
                        <Input type="textarea" id="about_item" name="about_item" placeholder="About this item" value={formData.about_item} onChange={handleChange} />
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
                        <Input type="select" id="category" name="category" value={formData.category} onChange={handleChange}>
                          <option>Select...</option>
                          <option>One</option>
                          <option>Two</option>
                          <option>Three</option>
                          <option>Four</option>
                          <option>Five</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="tax_class">Tax Class</Label>
                        <Input type="select" id="tax_class" name="tax_class" value={formData.tax_class} onChange={handleChange}>
                          <option>Select...</option>
                          <option>One</option>
                          <option>Two</option>
                          <option>Three</option>
                          <option>Four</option>
                          <option>Five</option>
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
                                    <Input
                                    type="radio"
                                    id="stock1"
                                    name="stock"
                                    value="true"
                                    checked={formData.stock_available === true}
                                    onChange={handleStockChange}
                                    />
                                    <Label htmlFor="stock1" check>Yes</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                    type="radio"
                                    id="stock0"
                                    name="stock"
                                    value="false"
                                    checked={formData.stock_available === false}
                                    onChange={handleStockChange}
                                    />
                                    <Label htmlFor="stock0" check>No</Label>
                                </FormGroup>
                            </FormGroup>
                        <FormGroup>
                          <Input type="text" id="quantity" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
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
                      <FileDropZone />
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
                      <Input type="select" id="size" name="size" value={formData.size} onChange={handleChange}>
                        <option>Select...</option>
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                        <option>Four</option>
                        <option>Five</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4" xl="3">
                    <FormGroup>
                      <Label htmlFor="color_attr">Color</Label>
                      <Input type="select" id="color_attr" name="color_attr" value={formData.color_attr} onChange={handleChange}>
                        <option>Select...</option>
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                        <option>Four</option>
                        <option>Five</option>
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
                      <Input type="text" id="url_key" name="url_key" placeholder="Url Key" value={formData.url_key} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_title">Meta title</Label>
                      <Input type="text" id="meta_title" name="meta_title" placeholder="Meta title" value={formData.meta_title} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_keywords">Meta keywords</Label>
                      <Input type="text" id="meta_keywords" name="meta_keywords" placeholder="Meta keywords" value={formData.meta_keywords} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col className="py-1" md="6" lg="4">
                    <FormGroup>
                      <Label htmlFor="meta_description">Meta description</Label>
                      <Input type="text" id="meta_description" name="meta_description" placeholder="Meta description" value={formData.meta_description} onChange={handleChange} />
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

export default AddEditProduct;

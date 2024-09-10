import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Table, Form } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import FileDropZone from '../uploader/FileDropZone';
import { addProduct } from '../../store/products/productSlice';

function AddEditProduct({ changed, prodtype }) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [allVarients, setAllVarients] = useState([]);
  const [varientColor, setVarientColor] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [variantImageFile, setVariantImageFile] = useState(null);
  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a FormData object to handle file uploads and form data
    const formData = new FormData();
  
    // Append general product data
    formData.append('product_name', e.target.product_name.value);
    formData.append('price', e.target.price.value);
    formData.append('use_for', e.target.use_for.value);
    formData.append('power_source', e.target.power_source.value);
    formData.append('material', e.target.material.value);
    formData.append('item_weight', e.target.item_weight.value);
    formData.append('size', e.target.size.value);
    formData.append('about_item', e.target.about_item.value);
    formData.append('video_link', e.target.video_link.value);
    formData.append('amazon_link', e.target.amazon_link.value);
    formData.append('flipkart_link', e.target.flipkart_link.value);
    formData.append('category_id', e.target.category_id.value);
    formData.append('subcategory_id', e.target.subcategory_id.value);
    formData.append('stock', e.target.stock.value);
    formData.append('qty', e.target.qty.value);
  
    // Append description from CKEditor
    formData.append('product_description', description);
  
    // Append images from FileDropZone
    images.forEach((image) => {
      formData.append('image_urls', image);
    });
  
    // Append variants
    allVarients.forEach((variant, index) => {
      formData.append(`variants[${index}][color]`, variant.variant);
      formData.append(`variants[${index}][image]`, variant.imageFile);
    });
  
    // Make an API request to submit the form data (replace the URL with the actual API)
    dispatch(addProduct(formData));
    changed(true);
  };
  
  const handleAddVariant = () => {
    if (varientColor && variantImageFile) {
      setAllVarients([...allVarients, { variant: varientColor, imageFile: variantImageFile }]);
      setVarientColor('');
      setVariantImageFile(null);
    }
  };

  const handleDeleteVariant = (index) => {
    setAllVarients(allVarients.filter((_, i) => i !== index));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVariantImageFile(file);
    }
  };
  
  const handleDescriptionChange = (data) => {
    console.log(data.data);
    setDescription(data.data);
  };

  const prodImagesChange = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  return (
    <div>
      {prodtype === 'add' ? (
        <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
          Add Product
        </Button>
      ) : (
        <FaRegEdit className="text-dark cursor-pointer fs-5" onClick={toggle} />
      )}
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>
          {prodtype === 'add' ? 'Add' : 'Edit'} Product
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="12">
                <Card>
                  <CardTitle className="border-bottom">
                    <div className="d-flex justify-content-between px-4 py-3">
                      <h4 className="m-0 fw-semibold">General</h4>
                      <FormGroup switch>
                        <Input type="switch" name="status" defaultChecked />
                      </FormGroup>
                    </div>
                  </CardTitle>
                  <CardBody>
                    <Row>
                      {/* Product form fields */}
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="product_name">Name</Label>
                          <Input type="text" id="product_name" name="product_name" placeholder="Name" required />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="price">Price</Label>
                          <Input type="text" id="price" name="price" placeholder="Price" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="use_for">Use For</Label>
                          <Input type="text" id="use_for" name="use_for" placeholder="Use For" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="power_source">Power Source</Label>
                          <Input type="text" id="power_source" name="power_source" placeholder="Power Source" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="material">Material</Label>
                          <Input type="text" id="material" name="material" placeholder="Material" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="item_weight">Item Weight</Label>
                          <Input type="text" id="item_weight" name="item_weight" placeholder="Item Weight" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="size">Size</Label>
                          <Input type="text" id="size" name="size" placeholder="Size" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="about_item">About this item</Label>
                            <Input type="textarea" id="about_item" name="about_item" placeholder="About this item" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="video_link">Video Link</Label>
                          <Input type="text" id="video_link" name="video_link" placeholder="Video Link" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="amazon_link">Amazon Link</Label>
                            <Input type="text" id="amazon_link" name="amazon_link" placeholder="Amazon Link" />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="flipkart_link">Flipkart Link</Label>
                            <Input type="text" id="flipkart_link" name="flipkart_link" placeholder="Flipkart Link" />
                        </FormGroup>
                      </Col>
                      <Col md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="category">Category</Label>
                          <Input type="select" id="category" name="category_id">
                            <option>Select...</option>
                            {/* Categories map */}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="subcategory">Sub Category</Label>
                          <Input type="select" id="subcategory" name="subcategory_id">
                            <option>Select...</option>
                            {/* Categories map */}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* <Col md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="subcategory">Tax Class</Label>
                          <Input type="select" id="subcategory" name="subcategory_id">
                            <option>Select...</option>
                          </Input>
                        </FormGroup>
                      </Col> */}


                      <Col xs="12">
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
                              <Input type="text" id="qty" name="qty" placeholder="Quantity" />
                            </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

            {/* Media Section */}
            <Col md="12">
              <ComponentCard title="Media">
                <FormGroup>
                  <FileDropZone prodImages={prodImagesChange} />
                </FormGroup>
              </ComponentCard>
            </Col>

            {/* Variants Section */}
            <Col md="12">
              <ComponentCard title="Variants">
                <Row>
                  <Col className="px-lg-3 border-end" lg="4">
                    <FormGroup>
                      <Label htmlFor="variantImage">Image</Label>
                      <Input type="file" className="custom-file-input mb-3" id="variantImage" onChange={handleImageChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="color">Color</Label>
                      <Input type="text" id="color" name="color" placeholder="Color" value={varientColor} onChange={(e) => setVarientColor(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                      <Button color="info" onClick={handleAddVariant}>Add</Button>
                    </FormGroup>
                  </Col>
                  <Col className="px-lg-3" lg="8">
                    {/* Table for displaying added variants */}
                    <Table className={allVarients.length === 0 ? 'd-none' : ''} variant="light" responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Color</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVarients.map((varient, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={URL.createObjectURL(varient.imageFile)} alt={`Variant ${index}`} width="50" height="50" /></td>
                            <td>{varient.variant}</td>
                            <td><i className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" onClick={() => handleDeleteVariant(index)} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row> 

            <ModalFooter>
              <Button color="dark" onClick={toggle}>Cancel</Button>
              <Button color="success" type="submit">{prodtype === 'add' ? 'Add' : 'Edit'}</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

AddEditProduct.propTypes = {
  changed: PropTypes.func.isRequired,
  prodtype: PropTypes.string.isRequired,
};

export default AddEditProduct;

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Table } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import './modalstyle.scss';
import FileDropZone from '../uploader/FileDropZone';
import { addProduct, updateProduct } from '../../store/products/productSlice';
import { fetchCategories } from '../../store/category/categorySlice';
import { uploadImages } from '../../store/fileupload/fileUploadSlice';

function AddEditProduct({changed, prodtype, data}) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [productState, setProductState] = useState(true);
  const toggle = () => setModal(!modal);
  const [varientImage, setvarientImage] = useState('');
  const [varientColor, setvarientColor] = useState('');
  const [allVarients, setallVarients] = useState([]);
  const [allCategories, setallCategories] = useState([])
  const { categories } = useSelector((state) => state.categories);
  const { uploadedFilesUrls } = useSelector((state) => state.fileUpload);

  console.log(uploadedFilesUrls);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.success) {
      setallCategories(categories?.categories);
    }
  }, [categories]);
  

  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    price: '',
    image_urls: ["https://drbwc.com/assets/catalog/3688/4400/1-single.jpeg", "https://drbwc.com/assets/catalog/3540/7366/ganesha-vector-icon-design-illustration-4287050-single.jpg"],
    qty: '',
    category_id: '',
    subcategory_id: 1,
    attribute_id: 2,
    variant_id: 3,
    use_for: '',
    power_source: '',
    material: '',
    item_weight: '',
    about_item: '',
    video_link: '',
    amazon_link: '',
    flipkart_link: '',
    status: 'active',
    visibility: 'public',
  });

  console.log('formData.category_id: ', formData.category_id);

  useEffect(() => {
    if (prodtype === "edit") {
      setFormData({
        ...formData,
        ...data,
      });
      setProductState(data.status === 'active');
    }
  }, [prodtype, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(prodtype === 'add'){
      dispatch(addProduct(formData));
    }else{
      dispatch(updateProduct(formData));
    }
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

  
  // const prodImagesChange = (e) => {
  //   setprodImages(e);
  //   // console.log(prodImages);
  // }
  const prodImagesChange = useCallback((images) => {
    dispatch(uploadImages(images));
  }, []);

  const handleAddVariant = () => {
    setallVarients([
      ...allVarients,
      { url: varientImage, variant: varientColor }
    ]);
    setFormData({
      ...formData,
      variant_image_urls: [
        ...allVarients,
        { url: varientImage, variant: varientColor }
      ]
    });
  };
  const handleImageChange = (e) => {
    // Assuming you want to handle the file, you might need to use FileReader to get the file URL or handle the file upload
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create a local URL for the file
      setvarientImage(fileURL);
    }
  };

  const handleDeleteVariant = (indexToDelete) => {
    setallVarients(allVarients.filter((_, index) => index !== indexToDelete));
  };


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
                    <Col className="py-1" md="6" lg="4" xl="3">
                      <FormGroup>
                        <Label htmlFor="color">Size</Label>
                        <Input type="text" id="color" name="size" placeholder="Size"/>
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
                    <Col className="py-1" md="6">
                      <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <Input type="select" id="category" name="category_id" value={formData.category_id} onChange={handleChange}>
                          <option>Select...</option>
                          {allCategories?.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="py-1" md="6">
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
                      <FileDropZone prodImages={prodImagesChange}/>
                      {/* <TestUploader/> */}
                    </FormGroup>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <ComponentCard title="Varients">
                <Row>
                  <Col className="px-lg-3 border-end" lg="4">
                    <FormGroup>
                        <Label htmlFor="stock1" check>Image</Label>
                        <Input type="file" className="custom-file-input mb-3" id="customFile3" onChange={handleImageChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="stock1" check>Color</Label>
                        <Input type="text" id="color" name="color" placeholder="Color" onChange={(e) => setvarientColor(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                      <Button color="info" onClick={handleAddVariant}>Add</Button>
                    </FormGroup>
                  </Col>
                  <Col className="px-lg-3" lg="8">
                    <Table className={allVarients?.length === 0 ? 'd-none' : ''} variant="light" responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Color</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVarients?.map((varient, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img src={varient.url} alt={`Variant ${index}`} width="50" height="50" />
                            </td>
                            <td>{varient.variant}</td>
                            <td>
                              <i className="bi bi-trash cursor-pointer ms-2 text-danger fs-5" onClick={() => handleDeleteVariant(index)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>              
          {/* <Row>
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
          </Row> */}
        </ModalBody>
        <ModalFooter className="px-5">
          <Button color="dark" onClick={toggle}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit}>
            {prodtype === 'add'?'Add':'Edit'}
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

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Table, Form } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import FileDropZone from '../uploader/FileDropZone';
import { addProduct, updateProduct } from '../../store/products/productSlice';

function AddEditProduct({ changed, prodtype, alldata }) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [allVarients, setAllVarients] = useState([]);
  const [varientColor, setVarientColor] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(alldata ? alldata.product_description : '');
  const [variantImageFile, setVariantImageFile] = useState(null);
  const toggle = () => setModal(!modal);

  console.log('images: ', images);
  console.log('alldata: ', alldata);

  useEffect(() => {
    if (prodtype === 'edit' && alldata?.color_image_urls) {
      const parsedData = JSON.parse(alldata.color_image_urls);
      const variantArray = Object.keys(parsedData).map(color => {
        return {
          variant: color,
          imageFile: parsedData[color].map((url, index) => {
            return new File([url], `filename-${index}.jpg`, { type: 'image/jpeg' });
          })
        };
      });
      setAllVarients(variantArray);
    }
  }, [prodtype, alldata]);

  // useEffect(() => {
  //   if (prodtype === 'edit' && alldata?.image_urls) {
  //     const parsedData = JSON.parse(alldata.image_urls);
  //     const imageArray = Object.keys(parsedData).map((url, index) => {
  //       return new File([url], `filename-${index}.jpg`, { type: 'image/jpeg' });
  //     });
  //     setImages(imageArray);
  //   }
  // }, [alldata])
  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  useEffect(() => {
    if (prodtype === 'edit' && alldata?.image_urls) {
      const imageUrls = JSON.parse(alldata.image_urls);
      
      const convertUrlsToFiles = async () => {
        // Create an array of promises for the URL to File conversions
        const filePromises = imageUrls.map((url, index) => 
          urlToFile(url, `image-${index}.jpg`)
        );
        
        // Wait for all promises to resolve
        const files = await Promise.all(filePromises);
        
        // Update state with the array of File objects
        console.log('files: ',files);
      };
  
      convertUrlsToFiles();
    }
  }, [prodtype, alldata]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a FormData object to handle file uploads and form data
    const formData = new FormData();
  
    // Append general product data
    formData.append('product_name', e.target.product_name.value);
    formData.append('price', e.target.price.value);
    formData.append('status', e.target.checked);
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
    // formData.append('stock', e.target.stock.value);
    formData.append('qty', e.target.qty.value);
  
    // Append description from CKEditor
    formData.append('product_description', description);
  
    // Append images from FileDropZone
    images.forEach((image) => {
      formData.append('image_urls', image);
    });
  
    // Append variants
    allVarients.forEach((variant) => {
      if (variant.imageFile) {
        // Loop through each file in the imageFile array
        Array.from(variant.imageFile).forEach((file, fileIndex) => {
          formData.append(`color_image_urls[${variant.variant}][${fileIndex}]`, file);
        });
      }
    });
    
  
    // Make an API request to submit the form data (replace the URL with the actual API)
    if (prodtype === 'edit') {
      dispatch(updateProduct({ formData, productId: alldata.id }));
    }else{
      dispatch(addProduct(formData));
    }

    changed(true);

    toggle();
  };
  
  const handleImageChange = (e) => {
    console.log(e);
    const file = e.target.files;
    if (file) {
      setVariantImageFile(file);
    }
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
        <ModalHeader className="bg-primary text-white px-lg-5" toggle={toggle}>
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
                        <Input type="switch" name="status" defaultChecked={prodtype === 'edit' ? alldata.status : true} />
                      </FormGroup>
                    </div>
                  </CardTitle>
                  <CardBody>
                    <Row>
                      {/* Product form fields */}
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="product_name">Name</Label>
                          <Input type="text" id="product_name" name="product_name" placeholder="Name" defaultValue={prodtype === 'edit' ? alldata.product_name : ''} required />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="price">Price</Label>
                          <Input type="text" id="price" name="price" placeholder="Price" defaultValue={prodtype === 'edit' ? alldata.price : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="use_for">Use For</Label>
                          <Input type="text" id="use_for" name="use_for" placeholder="Use For" defaultValue={prodtype === 'edit' ? alldata.use_for : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="power_source">Power Source</Label>
                          <Input type="text" id="power_source" name="power_source" placeholder="Power Source" defaultValue={prodtype === 'edit' ? alldata.power_source : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="material">Material</Label>
                          <Input type="text" id="material" name="material" placeholder="Material" defaultValue={prodtype === 'edit' ? alldata.material : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="item_weight">Item Weight</Label>
                          <Input type="text" id="item_weight" name="item_weight" placeholder="Item Weight" defaultValue={prodtype === 'edit' ? alldata.item_weight : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1"  md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="size">Size</Label>
                          <Input type="text" id="size" name="size" placeholder="Size" defaultValue={prodtype === 'edit' ? alldata.size : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="about_item">About this item</Label>
                            <Input type="textarea" id="about_item" name="about_item" placeholder="About this item" defaultValue={prodtype === 'edit' ? alldata.about_item : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="video_link">Video Link</Label>
                          <Input type="text" id="video_link" name="video_link" placeholder="Video Link" defaultValue={prodtype === 'edit' ? alldata.video_link : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="amazon_link">Amazon Link</Label>
                            <Input type="text" id="amazon_link" name="amazon_link" placeholder="Amazon Link" defaultValue={prodtype === 'edit' ? alldata.amazon_link : ''}/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                            <Label htmlFor="flipkart_link">Flipkart Link</Label>
                            <Input type="text" id="flipkart_link" name="flipkart_link" placeholder="Flipkart Link" defaultValue={prodtype === 'edit' ? alldata.flipkart_link : ''}/>
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

                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="description">Description</Label>
                          <CKEditorComponent value={description} getDescription={handleDescriptionChange} />
                        </FormGroup>
                      </Col>

                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                            <FormGroup>
                              <Label>Stock Quantity</Label>
                              <Input type="text" id="qty" name="qty" placeholder="Quantity" defaultValue={prodtype === 'edit' ? alldata.qty : ''}/>
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
                    <FileDropZone prodImages={prodImagesChange} initialImages={alldata?.image_urls ? JSON.parse(alldata.image_urls) : []}/>
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
                        <Input type="file" className="custom-file-input mb-3" id="variantImage" onChange={handleImageChange} multiple/>
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
                              <td>
                                {prodtype === 'edit' ? (
                                  // When in edit mode, use the URLs from alldata.color_image_urls
                                  (JSON.parse(alldata.color_image_urls)[varient.variant] || []).map((url, i) => (
                                    <img className='mx-1' key={i} src={url} alt={`Variant ${i}`} width="50" height="50" />
                                  ))
                                ) : (
                                  // When not in edit mode, use the uploaded files
                                  varient.imageFile && 
                                  Object.keys(varient.imageFile).map((key, i) => (
                                    <img className='mx-1' key={i} src={URL.createObjectURL(varient.imageFile[key])} alt={`Variant ${i}`} width="50" height="50" />
                                  ))
                                )}
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
  alldata: PropTypes.object,
};

export default AddEditProduct;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Table, Form } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import cogoToast from 'cogo-toast';
import ComponentCard from '../ComponentCard';
import CKEditorComponent from '../editor/CKEditorComponent';
import FileDropZone from '../uploader/FileDropZone';
import { addProduct, updateProduct } from '../../store/products/productSlice';
import { fetchCategories } from '../../store/category/categorySlice';
import { getsubcategories } from '../../store/subcategory/subcategorySlice';

function AddEditProduct({ changed, prodtype, alldata }) {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = useState(false);
  const [allVarients, setAllVarients] = useState([]);
  const [varientColor, setVarientColor] = useState('');
  const [categoryData, setcategoryData] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(alldata ? alldata.product_description : '');
  const [variantImageFile, setVariantImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productState, setProductState] = useState(true);
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);

  const toggle = () => setModal(!modal);

  // console.log('alldata', alldata);

  useEffect(() => {
    if (prodtype === 'edit' && alldata?.color_image_urls && alldata?.color_image_urls !== '{}') {
      const parsedData = alldata.color_image_urls;
      const parsedImagevariant =  JSON.parse(parsedData);
      const variantArray = Object.keys(parsedImagevariant).map(color => {
        return {
          variant: color,
          imageFile: parsedImagevariant[color]?.map((url, index) => {
            return new File([url], `filename-${index}.jpg`, { type: 'image/jpeg' });
          })
        };
      });
      setAllVarients(variantArray);
      setSelectedCategory(alldata.category_id);
      setProductState(alldata.status === 'active');
    }
  }, [prodtype, alldata]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getsubcategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.success) {
      setcategoryData(categories?.categories);
    }

    if (subcategories?.success && Array.isArray(subcategories?.subcategories)) {
      const filteredSubCategories = subcategories.subcategories.filter(
        (subCategory) => subCategory.category_id === parseInt(selectedCategory, 10)
      );
      setsubCategoryData(filteredSubCategories);
    }
  }, [categories, subcategories, selectedCategory]);

  useEffect(() => {
    if (prodtype === 'edit' && alldata?.color_image_urls && alldata?.color_image_urls !== '{}') {
      const parsedData = alldata.color_image_urls;
      const parsedImagevariant =  JSON.parse(parsedData);

      // Iterate over the color keys
      const variantArray = Object.keys(parsedImagevariant).map(async (color) => {
        const files = await Promise.all(
          parsedImagevariant[color]?.map(async (url) => {
            // Check if the URL is valid
            if (typeof url === 'string' && url.startsWith('uploads/')) {
              const fullUrl = `${apiUrl}/${url}`; // Construct full URL if necessary
              try {
                const response = await fetch(fullUrl);
                const blob = await response.blob();
                return new File([blob], url.split('/').pop(), { type: blob.type });
              } catch (error) {
                console.error('Error fetching file:', error);
                return null;
              }
            } else {
              console.warn('Invalid URL format:', url);
              return null;
            }
          })
        );
        return { variant: color, imageFile: files.filter(Boolean), imageURLs: parsedImagevariant[color] };
      });
  
      Promise.all(variantArray).then(setAllVarients);
      setSelectedCategory(alldata.category_id);
      setProductState(alldata.status === 'active');
    }
  }, [prodtype, alldata, apiUrl]);


  // console.log(categoryData, subCategoryData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      cogoToast.warn('Please upload at least one image', { position: 'top-right' });
      return;
    }

    // Create a FormData object to handle file uploads and form data
    const formData = new FormData();

    // Append general product data
    formData.append('product_name', e.target.product_name.value);
    formData.append('price', e.target.price.value);
    formData.append('status', productState ? 'Active' : 'Inactive');
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
    } else {
      dispatch(addProduct(formData));
    }

    changed(true);

    toggle();
  };

  const handleImageChange = (e) => {
    // console.log(e);
    const files = Array.from(e.target.files); // Convert FileList to array
    if (files.length) {
      setVariantImageFile(files);
    }

  };

  const handleAddVariant = () => {
    if (varientColor && variantImageFile) {
      const newVariant = {
        variant: varientColor,
        imageFile: variantImageFile,
        imageURLs: [] // Initialize an empty array for image URLs for new variants
      };

      // Handle image URLs in edit mode for existing data
      if (prodtype === 'edit' && alldata?.color_image_urls) {
        const parsedData = JSON.parse(alldata.color_image_urls);
        if (!parsedData[varientColor]) {
          parsedData[varientColor] = []; // Initialize the array for new color variants
        }
        newVariant.imageURLs = parsedData[varientColor]; // Store existing URLs for edit mode
      }

      // Update the state immediately for image preview
      setAllVarients((prevVarients) => [...prevVarients, newVariant]);

      // Reset input fields
      setVarientColor('');
      setVariantImageFile(null);
    }
  };


  const handleDeleteVariant = (index) => {
    setAllVarients(allVarients.filter((_, i) => i !== index));
  };


  const handleDescriptionChange = (data) => {
    setDescription(data.data);
  };

  const prodImagesChange = useCallback((newImages) => {
    setImages(newImages);
    // Logic to update allVarients with new images
    setAllVarients((prevVariants) =>
      prevVariants.map((variant, index) => {
        if (index === 0) { // assuming the first variant is updated with the new images
          return {
            ...variant,
            imageFile: newImages, // Update with new image files
          };
        }
        return variant;
      })
    );
  }, [  setAllVarients, setImages]);


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
                        <Input type="switch" defaultChecked={productState} onClick={() => { setProductState(!productState) }} />
                      </FormGroup>
                    </div>
                  </CardTitle>
                  <CardBody>
                    <Row>
                      {/* Product form fields */}
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="product_name" className="required">Name</Label>
                          <Input type="text" id="product_name" name="product_name" placeholder="Name" defaultValue={prodtype === 'edit' ? alldata.product_name : ''} required />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="price" className="required">Price</Label>
                          <Input type="text" id="price" name="price" placeholder="Price" defaultValue={prodtype === 'edit' ? alldata.price : ''} required/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="use_for">Use For</Label>
                          <Input type="text" id="use_for" name="use_for" placeholder="Use For" defaultValue={prodtype === 'edit' ? alldata.use_for : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="power_source">Power Source</Label>
                          <Input type="text" id="power_source" name="power_source" placeholder="Power Source" defaultValue={prodtype === 'edit' ? alldata.power_source : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="material">Material</Label>
                          <Input type="text" id="material" name="material" placeholder="Material" defaultValue={prodtype === 'edit' ? alldata.material : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="item_weight">Item Weight</Label>
                          <Input type="text" id="item_weight" name="item_weight" placeholder="Item Weight" defaultValue={prodtype === 'edit' ? alldata.item_weight : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" md="6" lg="4" xl="3">
                        <FormGroup>
                          <Label htmlFor="size">Size</Label>
                          <Input type="text" id="size" name="size" placeholder="Size" defaultValue={prodtype === 'edit' ? alldata.size : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="about_item" className="required">About this item</Label>
                          <Input type="textarea" id="about_item" name="about_item" placeholder="About this item" defaultValue={prodtype === 'edit' ? alldata.about_item : ''} required/>
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="video_link">Video Link</Label>
                          <Input type="text" id="video_link" name="video_link" placeholder="Video Link" defaultValue={prodtype === 'edit' ? alldata.video_link : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="amazon_link">Amazon Link</Label>
                          <Input type="text" id="amazon_link" name="amazon_link" placeholder="Amazon Link" defaultValue={prodtype === 'edit' ? alldata.amazon_link : ''} />
                        </FormGroup>
                      </Col>
                      <Col className="py-1" xs="12">
                        <FormGroup>
                          <Label htmlFor="flipkart_link">Flipkart Link</Label>
                          <Input type="text" id="flipkart_link" name="flipkart_link" placeholder="Flipkart Link" defaultValue={prodtype === 'edit' ? alldata.flipkart_link : ''} />
                        </FormGroup>
                      </Col>
                      <Col md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="category" className="required">Category</Label>
                          <Input type="select" id="category" name="category_id" onChange={(e) => setSelectedCategory(e.target.value)} defaultValue={prodtype === 'edit' ? alldata.category_id : ''} required >
                            <option value="">Select...</option> {/* Empty value ensures required works */}
                            {categoryData?.map((item) => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="subcategory" className="required">Sub Category</Label>
                          <Input type="select" id="subcategory" name="subcategory_id" defaultValue={prodtype === 'edit' ? alldata.subcategory_id : ''} required >
                            <option value="">Select...</option> {/* Empty value ensures required works */}
                            {subCategoryData?.map((item) => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
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
                            <Label className="required">Stock Quantity</Label>
                            <Input type="text" id="qty" name="qty" placeholder="Quantity" defaultValue={prodtype === 'edit' ? alldata.qty : ''} required/>
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
                    <FileDropZone prodImages={prodImagesChange} initialImages={alldata?.image_urls ? JSON.parse(alldata.image_urls) : []} />
                    {images.length === 0 && (
                      <label className="mt-2 desc-xxs text-danger">No files selected, Please select a file!</label>
                    )}
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
                        <Input type="file" className="custom-file-input mb-3" id="variantImage" onChange={handleImageChange} multiple />
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
                                {varient.imageURLs && varient.imageURLs.length > 0 ? (
                                  varient.imageURLs.map((url, i) => (
                                    <img className="mx-1" key={i} src={`${apiUrl}/${url}`} alt={`Variant ${i}`} width="50" height="50" />
                                  ))
                                ) : (
                                  // Display uploaded files for new variants
                                  varient.imageFile &&
                                  Array.from(varient.imageFile).map((file, i) => (
                                    <img className="mx-1" key={i} src={URL.createObjectURL(file)} alt={`Variant ${i}`} width="50" height="50" />
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
              <Button color="success" type="submit">{prodtype === 'add' ? 'Add' : 'Update'}</Button>
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

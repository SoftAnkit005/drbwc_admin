import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, Form } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../store/featuredproduct/featuredProductSlice';

function AddEditFeaturedProduct({ changed, featureproductType, data }) {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [categoryData, setcategoryData] = useState([]);
    const [formData, setFormData] = useState({ type: "", product_id: "", description: "", category_id: "", image: null, preview: null });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (categories?.success) {
            setcategoryData(categories?.categories);
        }
    }, [categories]);

    const { loading } = useSelector((state) => state.featuredproduct);

    useEffect(() => {
        if (featureproductType === "edit") {
            setFormData({
                type: data.type,
                product_id: data.product_id,
                description: data.description,
                image: null,
                category_id: data.category_id,
                preview: data.image ? `${apiUrl}/${data.image}` : null
            });
        }
    }, [featureproductType, data]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(files[0]),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "image" ? files[0] : value,
            }));
        }
    };

    const validate = () => {
        const errors = {};
        if (!formData.type) errors.type = "Title is required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.category_id) errors.category_id = "Category is required";
        if (!formData.image && featureproductType !== "edit") errors.image = "Image is required";
    
        setFormErrors(errors); // Set the renamed state
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Do not proceed if validation fails

        const formDataToSend = new FormData();
        formDataToSend.append("type", formData.type);
        formDataToSend.append("product_id", formData.product_id);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category_id", formData.category_id);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (featureproductType === "edit") {
                formDataToSend.append("id", data.id);
                await dispatch(updateSection(formDataToSend));
            } else {
                await dispatch(createSection(formDataToSend));
            }
            changed(true); // Notify the parent component of the changes
            toggle(); // Close the modal
        } catch (error) {
            console.error("Failed to update or create section:", error);
        }
    };

    return (
        <div>
            {featureproductType !== "edit" ? (
                <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
                    Add Feature Product
                </Button>
            ) : (
                <FaRegEdit className="text-dark cursor-pointer fs-5" onClick={toggle} />
            )}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="bg-primary text-white" toggle={toggle}>
                    {featureproductType === "edit" ? "Edit Feature Product" : "Add Feature Product"}
                </ModalHeader>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <ModalBody>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="type" className="required">Title</Label>
                                                    <Input
                                                        type="text"
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleChange}
                                                        placeholder="Enter Type"
                                                        required
                                                    />
                                                    {formErrors.type && <span className="text-danger">{formErrors.type}</span>}
                                                </FormGroup>
                                            </Col>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="description" className="required">Description</Label>
                                                    <Input
                                                        type="textarea"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        placeholder="Enter Description"
                                                        required
                                                    />
                                                    {formErrors.description && <span className="text-danger">{formErrors.description}</span>}
                                                </FormGroup>
                                            </Col>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="category" className="required">Category</Label>
                                                    <Input
                                                        type="select"
                                                        value={formData.category_id}
                                                        id="category"
                                                        name="category_id"
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select...</option>
                                                        {categoryData?.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    {formErrors.category_id && <span className="text-danger">{formErrors.category_id}</span>}
                                                </FormGroup>
                                            </Col>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="image" className="required">Image</Label>
                                                    <Input type="file" name="image" onChange={handleChange} required={featureproductType !== "edit"} />
                                                    {formData.preview && (
                                                        <img
                                                            src={formData.preview}
                                                            alt="Preview"
                                                            className="mt-4"
                                                            height={100}
                                                        />
                                                    )}
                                                    {formErrors.image && <span className="text-danger">{formErrors.image}</span>}
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
                        <Button color="success" disabled={loading}>
                            {featureproductType ? "Update" : "Add"}
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

AddEditFeaturedProduct.propTypes = {
    changed: PropTypes.func,
    data: PropTypes.object,
    featureproductType: PropTypes.string,
};

export default AddEditFeaturedProduct;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../store/featuredproduct/featuredProductSlice';

function AddEditFeaturedProduct({ changed, featureproductType, data }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formData, setFormData] = useState({
        type: "",
        product_id: "",
        description: "",
        image: null,
        preview: null
    });

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.featuredproduct);

    useEffect(() => {
        if (featureproductType === "edit") {
            setFormData({
                type: data.type,
                product_id: data.product_id,
                description: data.description,
                image: null,
                preview: data.image ? data.image : null
            })
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("type", formData.type);
        formDataToSend.append("product_id", formData.product_id);
        formDataToSend.append("description", formData.description);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (featureproductType === "edit") {
                // Append the ID to the formData if updating
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
            {featureproductType !== "edit" ?
                <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
                    Add Feature Product
                </Button>
                :
                <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle} />

            }

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="bg-primary text-white" toggle={toggle}>
                    {featureproductType === "edit" ? "Edit Feature Product" : "Add Feature Product"}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardBody className="p-0">
                                    <Row>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="type">Title</Label>
                                                <Input
                                                    type="text"
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleChange}
                                                    placeholder="Enter Type"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="product_id">Product ID</Label>
                                                <Input
                                                    type="text"
                                                    name="product_id"
                                                    value={formData.product_id}
                                                    onChange={handleChange}
                                                    placeholder="Enter Product ID"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="image">Image</Label>
                                                <Input type="file" name="image" onChange={handleChange} />
                                                {formData.preview && (
                                                    <img
                                                        src={formData.preview}
                                                        alt="Preview"
                                                        className="mt-2"
                                                        style={{ width: "100px", height: "100px" }}
                                                    />
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder="Enter Description"
                                                />
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
                    <Button color="success" disabled={loading} onClick={handleSubmit}>
                        Save
                    </Button>
                </ModalFooter>
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

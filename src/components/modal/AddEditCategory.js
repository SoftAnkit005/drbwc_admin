import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import './modalstyle.scss';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createCategory } from '../../store/category/categorySlice';

function AddEditCategory({ changed }) {
    const [modal, setModal] = useState(false);
    const [productState, setProductState] = useState(true);
    // const [categories, setCategories] = useState([]); // State to store categories fetched from API
    const toggle = () => setModal(!modal);
    const dispatch = useDispatch();
    // const { category, loading, error } = useSelector((state) => state.categories);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        position: '1',
        status: 'active',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(formData));
        changed(true);
        toggle();
    };

    return (
        <div>
            <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
                Add Category
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="bg-primary text-white" toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardTitle className="d-flex justify-content-end">
                                    <FormGroup switch>
                                        <Input type="switch" checked={productState} onChange={() => setProductState(!productState)} />
                                    </FormGroup>
                                </CardTitle>
                                <CardBody className="p-0">
                                    <Row>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="p_category">Parent Category</Label>
                                                <Input
                                                    type="select"
                                                    id="p_category"
                                                    name="p_category"
                                                    value={formData.p_category}
                                                    onChange={handleChange}
                                                >
                                                    {/* <option value="">Select...</option>
                                                    {categories.map((category) => (
                                                        <option value={category.id}>{category.name}</option>
                                                        
                                                    ))} */}

                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="py-1" xs="12">
                                            <FormGroup>
                                                <Label htmlFor="position">Position</Label>
                                                <Input
                                                    type="select"
                                                    id="s_category"
                                                    name="position"
                                                    value={formData.s_category}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Input>
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
                    <Button color="success" onClick={handleSubmit}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

AddEditCategory.propTypes = {
    changed: PropTypes.func,
};

export default AddEditCategory;

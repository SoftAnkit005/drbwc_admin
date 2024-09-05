import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Form } from 'reactstrap';
import './modalstyle.scss';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createCategory } from '../../store/category/categorySlice';


function AddEditCategory({ changed, allCategories }) {
    const [modal, setModal] = useState(false);
    const [productState, setProductState] = useState(true);
    // const [categories, setCategories] = useState([]); // State to store categories fetched from API
    const toggle = () => setModal(!modal);
    const dispatch = useDispatch();

    useEffect(() => {

    })


    console.log(allCategories)



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

    const handleSubmit = () => {
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
                                <Form onSubmit={handleSubmit} autoComplete="off">
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
                                                        required

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
                                                        <option value="">Select...</option>
                                                        {allCategories?.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}

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
                                                        {allCategories?.map((category, index) => (
                                                            <option key={category.id} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <div className='d-flex justify-content-end p-3 pb-0 border-top'>
                                        <Button color="dark" onClick={toggle}>
                                            Cancel
                                        </Button>
                                        <Button color="success" type="submit" className="ms-2">
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

AddEditCategory.propTypes = {
    changed: PropTypes.func,
    allCategories: PropTypes.array
};

export default AddEditCategory;

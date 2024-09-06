import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, Form } from 'reactstrap';
import './modalstyle.scss';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { createCategory, updateCategory } from '../../store/category/categorySlice';
import { createSubcategory, updatesubcategory } from '../../store/subcategory/subcategorySlice';

function AddEditCategory({ changed, allCategories, field, catType, data }) {
    const [modal, setModal] = useState(false);
    const [productState, setProductState] = useState(true);
    const dispatch = useDispatch();

    const toggle = () => setModal(!modal);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        position: '1',
        status: 'active',
    });

    const [subCatformData, setsubCatFormData] = useState({
        category_id :'',
        name: '',
        description: '',
        position: '1',
        status: 'active',
    });

    console.log(data);

    useEffect(() => {
        if (field === 'category' && catType === "edit") {
            setFormData({
            ...formData,
            ...data,
            });
            setProductState(data?.status === 'active');
        }else if(field === 'sub_category' && catType === "edit"){
            setsubCatFormData({
                ...subCatformData,
                ...data,
            })
            setProductState(data?.status === 'active');
        }
    }, [catType, data]);

    // console.log('formData: ',formData,'subCatformData: ', subCatformData);

    const handleStatusChange = () => {
        setFormData({
            ...formData,
            status: productState !== true ? 'active' : 'inactive'
        });
        setsubCatFormData({
            ...subCatformData,
            status: productState !== true ? 'active' : 'inactive'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setsubCatFormData({
            ...subCatformData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if(subCatformData.category_id !== '' && catType === "add"){
            dispatch(createSubcategory(formData));
        }else if(subCatformData.category_id === '' && catType === "add"){
            dispatch(createCategory(subCatformData));
        }else if(field === 'category' && catType === "edit"){
            dispatch(updateCategory(formData));
        }else if(field === 'sub_category' && catType === "edit"){
            dispatch(updatesubcategory(subCatformData));
        }

        changed(true);
        toggle(); 
    };

    return (
        <div>

            {catType !== 'edit' ? 
                <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
                    Add Category or Sub Category
                </Button>
                :
                <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle}/>
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="bg-primary text-white" toggle={toggle}>{catType !== 'edit' ? 'Add Category or Sub Category' : 'Edit Category or Sub Category'}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Form onSubmit={handleSubmit} autoComplete="off">
                                    <CardTitle className="d-flex justify-content-end">
                                        <FormGroup switch>
                                            <Input type="switch" defaultChecked={productState} onClick={() => { setProductState(!productState); handleStatusChange(!productState) }} />
                                        </FormGroup>
                                    </CardTitle>
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input type="text" id="name" name="name" placeholder="Enter Name" value={(field === 'category')?formData.name:subCatformData.name} onChange={handleChange} required />
                                                </FormGroup>
                                            </Col>
                                            <Col className={`py-1 ${(field === 'category' && catType === "edit")? 'd-none' : ''}`} xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="p_category">Parent Category</Label>
                                                    <Input type="select" id="p_category" name="category_id" value={subCatformData.category_id} onChange={handleChange} >
                                                        <option value=''>Select...</option>
                                                        {allCategories?.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className={`py-1 ${subCatformData.category_id !== '' ? 'd-none' : ''}`} xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="position">Position</Label>
                                                    <Input type="select" id="position" name="position" value={formData.position} onChange={handleChange} >
                                                        <option value=''>Select...</option>
                                                        {allCategories?.map((category, index) => (
                                                            <option key={category.id} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                        <option value={allCategories?.length+1}>
                                                            {allCategories?.length+1}
                                                        </option>
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
                                            {catType !== 'edit' ? 'Add' : 'Edit'}
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
    allCategories: PropTypes.array,
    data: PropTypes.object,
    field: PropTypes.string,
    catType: PropTypes.string
};

export default AddEditCategory;

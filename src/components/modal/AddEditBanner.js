import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody, Form } from 'reactstrap';
import './modalstyle.scss';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createBanner, updateBanner } from '../../store/banner/bannerSlice';

function AddEditBanner({ changed, bannerType, data }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [status, setStatus] = useState("active");
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.banners);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (bannerType === "edit" && data) {
            setTitle(data.title);
            setDescription(data.description);
            setStatus(data.status);
            setImagePreview(data.image_url);
        }
    }, [bannerType, data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const bannerData = {
            title,
            description,
            image,
            status
        };

        if (bannerType === "edit" && data) {
            dispatch(updateBanner({ id: data.id, bannerData }));
        } else {
            dispatch(createBanner(bannerData));
        }

        changed(true);
        toggle();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            {bannerType !== "edit" ?
                <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
                    Add Banner
                </Button> :
                <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle} />
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="bg-primary text-white" toggle={toggle}>
                    {bannerType === "edit" ? "Edit Banner" : "Add Banner"}
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
                                                    <Label htmlFor="title">Title</Label>
                                                    <Input
                                                        type="text"
                                                        id="title"
                                                        placeholder="Enter Title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="description">Description</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="description"
                                                        placeholder="Enter Description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="image">Select Image</Label>
                                                    <Input type="file" id="image" onChange={handleImageChange} />
                                                </FormGroup>
                                                {imagePreview && (
                                                    <div className="image-preview">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                )}
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
                            {bannerType === "edit" ? "Update" : "Save"}
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

AddEditBanner.propTypes = {
    changed: PropTypes.func,
    bannerType: PropTypes.string,
    data: PropTypes.object,
};

export default AddEditBanner;

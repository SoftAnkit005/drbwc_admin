import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import { FaRegEdit } from "react-icons/fa";
import { createTax, updateTax } from "../../../store/settings/taxsettings/taxsettingsSlice";

function AddEditTaxSetting({ changed, taxType, data }) {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.taxes);

    const [taxName, setTaxName] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (taxType === "edit" && data) {
            setTaxName(data.tax_name);
            setTaxRate(data.tax_rate);
            setDescription(data.description);
            setStatus(data.status);
        }
    }, [taxType, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taxes = {
            tax_name: taxName,
            tax_rate: parseInt(taxRate, 10),
            description,
            status
        };

        if (taxType === "edit" && data) {
            dispatch(updateTax({ id: data.id, taxes }));
        } else {
            dispatch(createTax(taxes));
        }
        changed(true);
        toggle();
    }
    return (
        <div>
            {taxType !== "edit" ?
                <Button color="primary" className="mb-4 w-fit" onClick={toggle}>Add Tax</Button>
                :
                <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle} />
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>{taxType === "edit" ? "Edit Tax" : "Add Tax"}</ModalHeader>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <ModalBody>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardTitle className="d-flex justify-content-end">
                                        <FormGroup switch>
                                            <Input type="switch" defaultChecked={status === "active"} onChange={(e) => setStatus(e.target.checked ? "active" : "inactive")} />
                                        </FormGroup>
                                    </CardTitle>
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="title">Tax Name</Label>
                                                    <Input
                                                        type="text"
                                                        value={taxName}
                                                        onChange={(e) => setTaxName(e.target.value)}
                                                        id="taxname"
                                                        placeholder="Enter Tax Name"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="title">Tax Rate</Label>
                                                    <Input
                                                        type="number"
                                                        value={taxRate}
                                                        onChange={(e) => {
                                                            const value = Math.min(100, e.target.value); // Ensure value does not exceed 100
                                                            setTaxRate(value);
                                                        }}
                                                        id="taxrate"
                                                        placeholder="Enter VAT Rate"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="py-1" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="description">Description</Label>
                                                    <Input
                                                        type="description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        rows="2"
                                                        id="description"
                                                        placeholder="Enter VAT Rate"
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
                        <Button color="dark" onClick={toggle}>Cancel</Button>
                        <Button color="success" disabled={loading}>Save</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

AddEditTaxSetting.propTypes = {
    changed: PropTypes.func,
    taxType: PropTypes.string,
    data: PropTypes.object,

}
export default AddEditTaxSetting
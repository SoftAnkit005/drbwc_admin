import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import './modalstyle.scss';
import { FaRegEdit } from 'react-icons/fa';
import { addReview, updateReview } from '../../store/reviews/reviewsSlice'; // Import actions

function AddEditReviews({ reviewType, data, changed }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (reviewType === 'edit' && data) {
      setReviewName(data.name);
      setReviewContent(data.review);
    }
  }, [reviewType, data]);

  const handleSave = () => {
    const formData = {
      name: reviewName,
      review: reviewContent,
    };

    if (reviewType === 'edit') {
      dispatch(updateReview({ id: data.id, ...formData }));
    } else {
      dispatch(addReview(formData));
    }

    changed(true);
    toggle();
  };

  return (
    <div>
      {reviewType !== 'edit' ? 
          <Button color="primary" className="mb-4 w-fit" onClick={toggle}>
              Add Review
          </Button>
          :
          <FaRegEdit className='text-dark cursor-pointer fs-5' onClick={toggle}/>
      }
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="bg-primary text-white" toggle={toggle}>
          {reviewType === 'edit' ? 'Edit Review' : 'Add Review'}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody className="p-0">
                  <Row>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Enter Name"
                          value={reviewName} // Bind review name state
                          onChange={(e) => setReviewName(e.target.value)} // Update review name state
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="12">
                      <FormGroup>
                        <Label htmlFor="review">Review</Label>
                        <Input
                          type="textarea"
                          id="review"
                          placeholder="Enter Review"
                          value={reviewContent} // Bind review content state
                          onChange={(e) => setReviewContent(e.target.value)} // Update review content state
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
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

AddEditReviews.propTypes = {
  reviewType: PropTypes.string,
  data: PropTypes.object,
  changed: PropTypes.func,
};

export default AddEditReviews;

import React from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import cogoToast from 'cogo-toast';
import { registerUser } from '../../store/auth/registerSlice';
import Logo from "../../assets/images/logos/drbwc_logo.svg";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import './auth.scss'

const RegisterFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationStatus = useSelector((state) => state.register.status);
  const registrationError = useSelector((state) => state.register.error);

  const initialValues = {
    full_name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const handleSubmit = (values) => {
    dispatch(registerUser(values)); // Dispatch the registerUser action with form values
  };

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card>
              <div className='d-flex justify-content-center my-2'>
                <img src={Logo} className="text-center" alt='logo-text' />
              </div>
              <CardBody className="p-4 m-1">
                <h4 className="fw-semibold">Register</h4>
                <small className="pb-2 d-block">
                  Already have an account? <Link to="/auth/login">Login</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit} // Use handleSubmit function for form submission
                >
                  {({ errors, touched }) => (
                    <Form>
                      {registrationStatus === 'failed' && (
                        <div className="error-tag mb-2">{registrationError}</div>
                      )}
                      {registrationStatus === 'succeeded' && (
                        <>
                          <div className="success-tag mb-2">Registration Successful!</div>
                          {cogoToast.success('Logged in Successfully!')}
                          {navigate('/dashboard')}
                        </>
                      )}
                      <FormGroup>
                        <Label htmlFor="UserName">User Name</Label>
                        <Field
                          name="UserName"
                          type="text"
                          className={`form-control ${
                            errors.UserName && touched.UserName ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="UserName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Register
                        </Button>
                        <Button type="reset" color="secondary">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterFormik;

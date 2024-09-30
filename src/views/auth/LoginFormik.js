import React, { useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import { loginUser } from '../../store/auth/loginSlice';
import Logo from "../../assets/images/logos/drbwc_logo.svg";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import './auth.scss'


const LoginFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);
  const [loginError, setLoginError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      if (result.success) {
        if (result.user.user_role !== "admin") {
          setLoginError('You are not an admin. Please login with admin credentials!');
          return;
        }
  
        if (result.token) {
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          cogoToast.success('Logged in successfully!');
          navigate('/dashboard');
        } else {
          setLoginError('Authentication token missing. Please try again.');
        }
      } else {
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      const errorMessage = error || 'An error occurred during login. Please try again.';
      setLoginError(errorMessage);
      cogoToast.error(errorMessage);
    }
  };
  

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0 text-primary" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card className="rounded">
              <div className='d-flex justify-content-center my-2'>
                <img src={Logo} className="text-center" alt='logo-text' />
              </div>
              <CardBody className="p-4 m-1">
                <h4 className="fw-semibold">Login</h4>
                <small className="pb-4 d-block"> Do not have an account? <Link to="/auth/register">Sign Up</Link> </small>
                {loginError && <p className='error-tag mb-2'>{loginError}</p>}
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin} >
                  {() => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field name="email" type="text" className="form-control" required/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field name="password" type="password" className="form-control" required/>
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" /> Remember me
                        </Label>
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
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

export default LoginFormik;

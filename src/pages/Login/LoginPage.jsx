import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../axiosInstance';
import './Login.css'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post('/auth/login', values);
      login(res.data.token, res.data.user);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setErrors({ password: 'Invalid email or password',err });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>HR Reporting System Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage component="div" className="error" name="email" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage component="div" className="error" name="password" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

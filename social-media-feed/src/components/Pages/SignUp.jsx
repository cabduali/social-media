import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { AuthContext } from '../AppContext/AppContext';
import { auth, onAuthStateChanged } from '../firebase/firebase';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .min(4, 'Must be at least 4 characters long')
      .matches(/^[a-zA-Z]+$/, 'Name can only contain letters'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Must be at least 6 characters long'),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert('Check your input fields');
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit: handleRegister });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <Card className="w-96">
            <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
              <Typography variant="h3" color="white">Sign Up</Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    size="lg"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant="small" color="red">{formik.errors.name}</Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="lg"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">{formik.errors.email}</Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="small" color="red">{formik.errors.password}</Typography>
                  )}
                </div>
                <Button variant="gradient" fullWidth type="submit" className="mb-4">Register</Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="mt-6 flex font-roboto text-base justify-center">
                Already have an account?
                <Link to="/login">
                  <p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">Login</p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignUp;

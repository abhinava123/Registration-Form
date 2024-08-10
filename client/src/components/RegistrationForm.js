import {React,useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast';
import { BsEye ,BsEyeSlash } from "react-icons/bs";
const RegistrationForm = () => {
  const [loading,setLoading]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  // Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, '*Full Name must be at least 2 characters')
      .required('Required'),
    email: Yup.string()
      .email('*Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, '*Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '*Passwords must match')
      .required('*Required'),
  });

  // Form Submission
  const onSubmit = async(values, { setSubmitting,setErrors,resetForm }) => {
    setLoading(true); // Show spinner
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.error)
        throw new Error('Network response was not ok');
      }


      console.log('Form submitted:', result);
       toast.success('Registration successful!');


      resetForm();
    } catch (error) {

      console.error('Error during form submission:', error);

      setErrors({ general: 'Something went wrong!' });

      toast.error("something went wrong")

    } finally {
      setSubmitting(false);
      setLoading(false); // Hide spinner
    }
  };

  return (<>
       {loading && <Spinner type={"loading"} color={"black"}  />}
  <Formik
      initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (

        <Form className='bg-richblack-500 flex px-6 flex-col justify-center items-start y-auto gap-1 rounded-xl'>
          <h1 className='text-pure-greys-25 text-3xl text-center mt-3 mx-auto'>Registration Form</h1>
          <div className='flex flex-col justify-center items-start gap-1 my-2 mx-3'>
            <label className='text-pure-greys-25 text-[14px]' htmlFor="fullName">Full Name:</label>

            <Field className='bg-richblack-700 w-[350px] text-pure-greys-25 mt-1 border-spacing-10 rounded-xl h-11  font-light border-richblack-600 border-b-richblack-200 border-b' type="text" name="fullName" />
            <ErrorMessage name="fullName" component="div" className="error text-red " />
          </div>

          <div className='flex flex-col justify-center items-start gap-1 my-2 mx-3'>
            <label className='text-pure-greys-25 text-[14px]' htmlFor="email">Email:</label>

            <Field className='bg-richblack-700 w-[350px] text-pure-greys-25 mt-1 border-spacing-10 rounded-xl h-11  font-light border-richblack-600 border-b-richblack-200 border-b' type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error text-red " />
          </div>

          <div className='flex flex-col justify-center items-start gap-1 my-2 mx-3 relative'>
            <label className='text-pure-greys-25 text-[14px]' htmlFor="password">Password:</label>

            <Field className='bg-richblack-700 w-[350px] text-pure-greys-25 mt-1 border-spacing-10 rounded-xl h-11  font-light border-richblack-600 border-b-richblack-200 border-b' type={showPassword?"text":"password"} name="password" />
            <div className=' z-10 text-white absolute right-4 top-10' onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?<BsEyeSlash/>:<BsEye/>}</div>
            <ErrorMessage name="password" component="div" className="error text-red " />
          </div>
          <div className='flex flex-col justify-center items-start gap-1 my-2 mx-3 relative'>
            <label className='text-pure-greys-25 text-[14px]' htmlFor="confirmPassword">Confirm Password:</label>

            <Field className='bg-richblack-700 w-[350px] text-pure-greys-25 mt-1 border-spacing-10 rounded-xl h-11  font-light border-richblack-600 border-b-richblack-200 border-b' type={showPassword?"text":"password"} name="confirmPassword" />
            <div className=' z-10 text-white absolute right-4 top-10' onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?<BsEyeSlash/>:<BsEye/>}</div>
            <ErrorMessage name="confirmPassword" component="div" className="error text-red " />
          </div>
          <button className='bg-yellow-5 w-[350px] py-2 mx-3 mb-3 mt-2 rounded-xl' type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  </>

  );
};

export default RegistrationForm;


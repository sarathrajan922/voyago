import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    mobile: any;
    password: string;
    idProof_img?: File |null;  
}

const validationSchema: Yup.Schema<FormValues>  = Yup.object({
    firstName: Yup.string().min(3 , "first name must have 3 characters").required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.number().required('Mobile is required'),
    password: Yup.string().required('Password is required'),
    // idProof_img: Yup.mixed().required('ID Proof is required')  as Yup.MixedSchema<File | null>,
  });


export default function AgentLoginForm() {
   
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()
  // Validation schema using Yup
  

  // Form submission handler
  const handleSubmit = async (values: FormValues ) => {
    const formData = new FormData();
    if(file){
        formData.append('idProof_img', file);
    }
    
    //   console.log(values)
      
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('mobile', values.mobile)
     
          
      

      
  


    // //! call fetch or axios here
    fetch('http://localhost:8000/agent/signup',{
        method: 'POST',
        body: formData
    }).then(async (response: any)=>{
        const parsedData = await response.json()
        console.log(parsedData)
        const token = parsedData?.token
        localStorage.setItem('agentAccessToken',token)
        parsedData?.status ? navigate('/') : navigate('/agent/signup')
    })
    // try {
    //     const response = await axios.post('http://localhost:8000/agent/signup', formData);
    //     const parsedData = response.data;
    //     console.log(parsedData);
    //     const token = parsedData?.token;
    //     localStorage.setItem('agentAccessToken', token);
    //     parsedData?.status ? navigate('/') : navigate('/agent/signup');
    //   } catch (error) {
    //     console.error(error);
    //   }
    
  };
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
//     if(event.target.files){
//         const file = event?.target?.files[0]

//         setFile(file)
//     }
//   }
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto rounded-full bg-slate-700"
            src="https://res.cloudinary.com/dk4darniv/image/upload/v1687011586/Voyago_Health_LogoType-1_fnahpn.webp"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Agent Signup form
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              password: '',
              idProof_img: null
              
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6" encType="multipart/form-data">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="firstName"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile
                </label>
                <div className="mt-2">
                  <Field
                    id="mobile"
                    name="mobile"
                    type="number"
                    autoComplete="mobile"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500" />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
              </div>

              {/* ID Proof upload */}
              <div>
                <label htmlFor="idProof_img" className="block text-sm font-medium leading-6 text-gray-900">
                  Upload your identification proof
                </label>
                <div className="mt-2">
                  <Field
                    id="idProof_img"   
                    name="idProof_img"
                    type="file"
                    autoComplete="idProof_img"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleFileChange}
                  />
                  <ErrorMessage name="idProof_img" component="div" className="text-red-500" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </Form>
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Already I have an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
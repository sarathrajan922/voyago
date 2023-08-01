import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { agentLogin } from "../../../features/axios/api/agent/agentAuthentication";
import { setAgent } from "../../../features/redux/slices/agent/agentSlice";
import { useEffect, useState } from "react";
import { CircleLoader, PropagateLoader, PulseLoader } from "react-spinners";  

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function AgentLoginForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isload,setIsLoad] = useState<boolean | null>(null)

  useEffect(()=>{
  const token = window.localStorage.getItem('agentToken')
  setIsLoad(true)
  if(token){
    navigate('/agent')
  }
  },[])
  const initialValues = {
    email: "",
    password: "",
  };
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });
  };

  const handleSubmit = async (values: FormValues) => {
    await agentLogin(values)
      .then((data) => {
        localStorage.setItem("agentToken", data?.token);
        dispatch(setAgent(data?.agentData))
        notify("Agent Logged successfully", "success");
        setTimeout(() => {
          // navigate("/agent");
          window.location.reload()
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return  !isload ? <div className=" w-full flex justify-center  h-full ">
  <div className="py-52">
    <CircleLoader color="#1bacbf " />
  </div>
</div> :  (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img
          className="mx-auto h-10 w-auto rounded-full bg-slate-700"
          src="https://res.cloudinary.com/dk4darniv/image/upload/v1690722658/voyago%20logo/voyago-high-resolution-logo-color-on-transparent-background_1_joe0sz.webp"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Agent Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/agent/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            create an account
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

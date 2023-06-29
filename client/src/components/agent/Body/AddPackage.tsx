// import React from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";

// const AddPackage: React.FC = () => {
//   return (
//     <div className="p-4 sm:ml-64">
//       <div className="p-4  mt-14">
    
//         {/* first sectionL */}

//         <form action="">
//         <div className="flex items-center justify-between  h-28 mb-4 rounded bg-gray-50 ">
//           <div className="p-10">
//             <h1 className="font-bold text-2xl">Add Tour Package</h1>
//           </div>
//           <div className="pr-10">
//             <button
//               type="button"
//               className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//             >
//               Publish
//             </button>
//           </div>
//         </div>

//         {/* second section */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex-col items-center justify-between rounded  h-28 dark:bg-gray-800">
//             <div className="ps-4 pt-4">
//               <label
//                 htmlFor="first_name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 PackageName:
//               </label>
//               <input
//                 type="text"
//                 id="first_name"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Enter your package name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex-col items-center justify-center ms-3 rounded  h-28 dark:bg-gray-800">
            
//             <label
//               htmlFor="images"
//               className="block  text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Upload images
//             </label>
//             <input type="file" name="images" className="ps-5 pt-2  " id="" />
//           </div>
//         </div>

//         {/* third section */}

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center justify-between rounded   h-28 dark:bg-gray-800">
//             <div className="p-5">
//               <label
//                 htmlFor="first_name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Description:
//               </label>
//               <textarea
//                 id="message"
//                 className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Write your thoughts here..."
//               ></textarea>
//             </div>
//           </div>
//           <div className="flex-col items-center justify-center ms-3 rounded  h-28 dark:bg-gray-800">
//             <div className="ps-4 pt-4">
//               <label
//                 htmlFor="countries"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Category:
//               </label>
//               <select
//                 id="countries"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               >
//                 <option selected>Choose a category</option>
//                 <option value="US">United States</option>
//                 <option value="CA">Canada</option>
//                 <option value="FR">France</option>
//                 <option value="DE">Germany</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* fouth section */}

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center justify-between rounded   h-28 dark:bg-gray-800">
//           <div className="p-5">
//               <label
//                 htmlFor="first_name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Locations:
//               </label>
//               <textarea
//                 id="message"
//                 className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="seprate your locations using ' , '"
//               ></textarea>
//             </div>
            


//           </div>
//           <div className="flex items-center justify-between rounded   h-28 dark:bg-gray-800">
//           <div className="ps-4 pt-4">
//               <label
//                 htmlFor="first_name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Price:
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Enter your package price"
//                 required
//               />
//             </div>
            


//           </div>
//           <div className="flex-col items-center justify-center ms-3 rounded  h-64 dark:bg-gray-800">
//             <div className="ps-4 pt-4">
         
//               <h3 className="mb-4  text-gray-900 dark:text-white">
//                 Services
//               </h3>
//               <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
//                 <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                   <div className="flex items-center pl-3">
//                     <input
//                       id="vue-checkbox"
//                       type="checkbox"
//                       value=""
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                     />
//                     <label
//                       htmlFor="vue-checkbox"
//                       className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                      Accommodation
//                     </label>
//                   </div>
//                 </li>
//                 <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                   <div className="flex items-center pl-3">
//                     <input
//                       id="react-checkbox"
//                       type="checkbox"
//                       value=""
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                     />
//                     <label
//                       htmlFor="react-checkbox"
//                       className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                       Transportation
//                     </label>
//                   </div>
//                 </li>
//                 <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                   <div className="flex items-center pl-3">
//                     <input
//                       id="angular-checkbox"
//                       type="checkbox"
//                       value=""
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                     />
//                     <label
//                       htmlFor="angular-checkbox"
//                       className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                      Tour guide
//                     </label>
//                   </div>
//                 </li>
                
//               </ul>
            
             
//             </div>
//           </div>
//         </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPackage;
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  packageName: string;
  images: FileList | null;
  description: string;
  category: string;
  locations: string;
  price: number;
  services: string[];
}

const AddTourPackageForm: React.FC = () => {
  const initialValues: FormValues = {
    packageName: '',
    images: null,
    description: '',
    category: '',
    locations: '',
    price: 0,
    services: [],
  };

  const validationSchema = Yup.object({
    packageName: Yup.string().required('Package name is required'),
    images: Yup.mixed().required('Images are required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    locations: Yup.string().required('Locations are required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
  });

  const onSubmit = (values: FormValues) => {
    // Handle form submission
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="p-4 sm:ml-64">
     <div className="p-4  mt-14">
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center justify-between h-28 mb-4 rounded bg-gray-50">
        <div className="p-10">
          <h1 className="font-bold text-2xl">Add Tour Package</h1>
        </div>
        <div className="pr-10">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Publish
          </button>
        </div>
      </div>

      {/* second section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex-col items-center justify-between rounded h-28 dark:bg-gray-800">
          <div className="ps-4 pt-4">
            <label htmlFor="packageName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Package Name:
            </label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your package name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.packageName}
            />
            {formik.touched.packageName && formik.errors.packageName && (
              <div className="text-red-500">{formik.errors.packageName}</div>
            )}
          </div>
        </div>

        <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
          <label htmlFor="images" className="block text-sm font-medium text-gray-900 dark:text-white">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="ps-5 pt-2"
            onChange={(event) => {
              formik.setFieldValue('images', event.currentTarget.files);
            }}
          />
          {formik.touched.images && formik.errors.images && <div className="text-red-500">{formik.errors.images}</div>}
        </div>
      </div>

      {/* third section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
          <div className="p-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>
        </div>
        <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
          <div className="ps-4 pt-4">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category:
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="" disabled selected>
                Choose a category
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
          </div>
        </div>
      </div>

      {/* fourth section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
          <div className="p-5">
            <label htmlFor="locations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Locations:
            </label>
            <textarea
              id="locations"
              name="locations"
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Separate your locations using ','"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.locations}
            ></textarea>
            {formik.touched.locations && formik.errors.locations && (
              <div className="text-red-500">{formik.errors.locations}</div>
            )}
          </div>
        </div>

        <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
          <div className="ps-4 pt-4">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && <div className="text-red-500">{formik.errors.price}</div>}
          </div>
        </div>
      </div>

      {/* fifth section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
          <div className="p-5">
            <label htmlFor="services" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Services:
            </label>
            <textarea
              id="services"
              name="services"
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Separate your services using ','"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.services}
            ></textarea>
            {formik.touched.services && formik.errors.services && (
              <div className="text-red-500">{formik.errors.services}</div>
            )}
          </div>
        </div>
      </div>
    </form>
    </div>
    </div>
  );
};

export default AddTourPackageForm;



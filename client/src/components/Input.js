import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass
}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <div className="relative">
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={showPassword ? 'text' : type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  )
}

//const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"



// export default function Input({
//     handleChange,
//     value,
//     labelText,
//     labelFor,
//     id,
//     name,
//     type,
//     isRequired=false,
//     placeholder,
//     customClass
// }){
//     return(
//         <div className="my-5">
//             <label htmlFor={labelFor} className="sr-only">
//               {labelText}
//             </label>
//             <input
//               onChange={handleChange}
//               value={value}
//               id={id}
//               name={name}
//               type={type}
//               required={isRequired}
//               className={fixedInputClass+customClass}
//               placeholder={placeholder}
//             />
//           </div>
//     )
// }
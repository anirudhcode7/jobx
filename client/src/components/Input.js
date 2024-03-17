import React from "react";
import { TextInput } from "@tremor/react";

// const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
// const tremorInputClass = "tremor-input rounded-md focus:outline-none focus:border-red-500"
export default function InputField({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  error = false,
  errorMessage,
  placeholder,
  customClass
}) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="block text-sm mb-1 font-semibold text-gray-600">{labelText}</label>
        <TextInput
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          placeholder=""
          className="rounded-md tremor-brand-muted focus:outline-none focus:border-red-500"
          // error={error}
          // errorMessage={errorMessage}
        />
        {error && 
          <p className="my-1 text-xs text-rose-500 font-semibold">{errorMessage}</p>
        } 
      </div>
    </>
  )
}
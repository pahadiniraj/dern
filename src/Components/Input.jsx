import React from "react";
import { useFormik } from "formik";

const Input = ({
  type,
  formik,
  id,
  name,
  value,
  onChange,
  onBlur,
  multiple,
  divclassName,
  className,
  placeholder,
  title,
  checked,
  hidden,
  readOnly,
  ...props
}) => {
  return (
    <div className={`mb-5 ${divclassName} `}>
      <label
        htmlFor={name}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>

      <input
        hidden={hidden}
        type={type}
        id={id}
        name={name}
        value={value}
        multiple={multiple}
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
        readOnly={readOnly}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs mt-2">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Input;

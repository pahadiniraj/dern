import React from "react";

const TextArea = ({ title, rows, cols,className, placeholder, childrens,formik ,onChange,onBlur, name, value }) => {
  return (
    <div>
      <label
        for="feedback"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <textarea
        id="feedback"
        rows={rows}
        name={name}
        cols={cols}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        class={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        placeholder={placeholder}
      >{value}</textarea>
   {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs mt-2">{formik.errors[name]}</div>
      ) : null}

    </div>
  );
};

export default TextArea;

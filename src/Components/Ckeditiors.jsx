import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Ckeditiors = ({ title, formik, name, className, ...props }) => {

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>

      <CKEditor
        className={className}
        editor={ClassicEditor}
        data={formik.values[name]}
        onReady={(editor) => {
          console.log("CKEditor5 React Component is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          formik.setFieldValue(name, data);
          console.log({ event, editor, data });
        }}
        {...props}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs mt-2">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Ckeditiors;

const sendata = (values) => {
  const formdata = new FormData();
  formdata.append("title", values.title);
  formdata.append("content", values.content);
  if (values.image) {
    formdata.append("image", values.image);
  }
  if (values.newimage) {
    formdata.append("newimage", values.newimage);
  }

  //   if (values.newimage) {
  //     formdata.append("newimage", values.image);
  //   }
  return formdata;
};

export default sendata;

export const saveImages = async (file) => {
  let urlImage = "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "presetImage");
  await fetch("https://api.cloudinary.com/v1_1/do1buub4f/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((file) => (urlImage = file.secure_url))
    .catch((e) => console.log(e));
  return urlImage;
};

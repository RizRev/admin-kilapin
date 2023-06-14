import React, { useState } from "react";

const AddPostForm = ({ addPost }) => {
  const initialFormState = { judul: "", isi: "", penulis: "", tanggal: "", image: "" };
  const [post, setPost] = useState(initialFormState);
  console.log("ini post",post)

  const handleInputChange = (event
) => {
const { name, value } = event.target;
setPost({ ...post, [name]: value });
};

const handleSubmit = (event) => {
console.log("menjalankan ini")
event.preventDefault();
// if (!post.judul || !post.isi || !post.penulis || !post.tanggal || !post.image) {return} else {console.log()} ;
addPost(post);
setPost(initialFormState);
};

return (
<form onSubmit={handleSubmit}>
<label>Title:</label>
<input type="text" name="judul" value={post.judul} onChange={handleInputChange} />
<label>Content:</label>
<textarea name="isi" value={post.isi} onChange={handleInputChange}></textarea>
<label>Author:</label>
<input type="text" name="penulis" value={post.penulis} onChange={handleInputChange} />
<label>Date:</label>
<input type="text" name="tanggal" value={post.tanggal} onChange={handleInputChange} />
<label>image:</label>
<input type="file" name="image" value={post.image} onChange={handleInputChange} />
<button>Add new post</button>
</form>
);
};

export default AddPostForm;
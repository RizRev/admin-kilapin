import React, { useState, useEffect } from "react";

const EditPostForm = ({ editing, setEditing, currentPost, updatePost }) => {
  const [post, setPost] = useState(currentPost);

  useEffect(() => {
    setPost(currentPost);
  }, [currentPost]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!post.judul || !post.isi || !post.penulis || !post.tanggal || !post.image) return;
    updatePost(post.id, post);
  };

  const handleCancel = () => {
    setEditing(false);
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
      <input type="text" name="image" value={post.image} onChange={handleInputChange} />
      <button>Update post</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditPostForm;
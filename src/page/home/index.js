import React, { useEffect, useState } from "react";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";
import PostTable from "./PostTable";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = { id: null, judul: "", isi: "", penulis: "", tanggal: "", image: "" };
    const [currentPost, setCurrentPost] = useState(initialFormState);
  
    // Fetch data dari server
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://153.92.4.143:5000/news/");
        const data = await response.json();
        setPosts(data.data);
        console.log(data.data)
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
  
    // Menambahkan post baru
    const addPost = async (post) => {
        console.log("menjalankan add post",post)

      try {
        console.log("menjalankan add post")
        const result = await fetch("http://localhost:5000/news/input", {
          method: "POST",
          body: post,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchPosts();
        console.log(result)
      } catch (error) {
        console.log("Error adding post:", error);
      }
    };
  
    // Menghapus post
    const deletePost = async (id) => {
      try {
        await fetch(`http://153.92.4.143:5000/news/${id}`, {
          method: "DELETE",
        });
        fetchPosts();
      } catch (error) {
        console.log("Error deleting post:", error);
      }
    };
  
    // Mengatur post yang akan diedit
    const editPost = (post) => {
      setEditing(true);
      setCurrentPost({
        id: post.id,
        judul: post.judul,
        isi: post.isi,
        penulis: post.penulis,
        tanggal: post.tanggal,
        image: post.image,
      });
    };
  
    // Memperbarui post
    const updatePost = async (id, updatedPost) => {
      try {
        await fetch(`URL_API_ANDA/posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        });
        setEditing(false);
        setCurrentPost(initialFormState);
        fetchPosts();
      } catch (error) {
        console.log("Error updating post:", error);
      }
    };
  
    return (
      <div className="container">
        <h1>CRUD React App</h1>
        {editing ? (
          <EditPostForm
            editing={editing}
            setEditing={setEditing}
            currentPost={currentPost}
            updatePost={updatePost}
          />
        ) : (
          <AddPostForm addPost={addPost} />
        )}
        <h2>Posts</h2>
        <PostTable posts={posts} deletePost={deletePost} editPost={editPost} />
      </div>
    );
  };

export default Home
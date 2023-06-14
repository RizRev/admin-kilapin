import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PostTable from '../home/PostTable';
function Test() {
const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, title: "", content: "", author: "", image: "" };
  const [currentPost, setCurrentPost] = useState(initialFormState);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [post, setPost] = useState(currentPost);
  const [updatePost,setUpdatePost] = useState('')
  const [newTitle, setNewTitle] = useState(currentPost.title);
  const [newContent, setNewContent] = useState(currentPost.content);
  const [newAuthor, setNewAuthor] = useState(currentPost.author);
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    handleCancel()};
  const handleShow = () => setShow(true);

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  
  useEffect(() => {
    setNewTitle(currentPost.title);
  }, [currentPost]);

  const handleNewContentChange = (event) => {
    setNewContent(event.target.value);
  };
  
  useEffect(() => {
    setNewContent(currentPost.content);
  }, [currentPost]);

  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  
  useEffect(() => {
    setNewAuthor(currentPost.author);
  }, [currentPost]);
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/`);
      const data = await response.json();
      setPosts(data.data.sort((a,b) => b.id -a.id));
      console.log(data.data)
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Menghapus post
  const deletePost = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${id}`, {
        method: "DELETE",
      });
      fetchPosts();
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

   // Mengatur post yang akan diedit

   useEffect(() => {
    setPost(currentPost);
  }, [currentPost]);


   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleEdit = (event) => {
    handleClose()
    event.preventDefault();
    if (!newTitle || !newContent || !newAuthor 
      // || !currentPost.image
      ) {
      return;
    }
    console.log("id",post.id,"isi input formdata",newTitle,newContent,newAuthor,image)
    const formData = new FormData();
    formData.append('judul', newTitle);
    formData.append('isi', newContent);
    formData.append('penulis', newAuthor);
    formData.append('gambar', image);
    console.log("isi forn data",formData)
    
    // Kirim permintaan PUT ke server menggunakan fetch atau axios
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/edit/${post.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Tangani respons dari server
        console.log(data);
        setPreviewImage("")
        setImage("")
        setEditing(false); // Menonaktifkan mode edit setelah berhasil mengedit
        fetchPosts(); // Mengambil ulang daftar post setelah berhasil mengedit
      })
      .catch((error) => {
        // Tangani kesalahan
        console.error(error);
      });
  };
  

  const handleCancel = () => {
    setEditing(false);
  };
  
   const editPost = (post) => {
    handleShow()
    console.log(currentPost.id)
    console.log(editing)
    console.log("ini post",post)
    setEditing(true);
    setCurrentPost({
      id: post.id,
      title: post.judul,
      content: post.isi,
      author: post.penulis,
      image: post.photo,
    });
    console.log("isi current",currentPost)
  };


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
    console.log(previewImage)
  };

  const handleSubmit = (event) => {
    handleClose();

    event.preventDefault();
    
    // Buat objek FormData untuk mengirim data dan file gambar
    const formData = new FormData();
    formData.append('judul', title);
    formData.append('isi', content);
    formData.append('penulis', author);
    formData.append('gambar', image);
    console.log(formData)

    // Kirim permintaan POST ke server menggunakan fetch atau axios
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/input`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Tangani respons dari server
        console.log(data);
        setAuthor('')
        setContent('')
        setTitle('')
        setImage('')
        setPreviewImage('')
      })
      .catch((error) => {
        // Tangani kesalahan
        console.error(error);
      });
  };

  const handleSaveChanges = () => {
    handleSubmit();
    handleClose();
    // fetchPosts()
  };
  
  return (
    <div>
      {editing ? (
        <div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>
        <Modal.Body> <form onSubmit={handleEdit}>
        <div>
          <label htmlFor="title">Judul:</label>
          <input type="text" id="title" value={newTitle} onChange={handleNewTitleChange} />
        </div>
        <div>
          <label htmlFor="content">Isi:</label>
          <textarea id="content" value={newContent} onChange={handleNewContentChange} />
        </div>
        <div>
          <label htmlFor="author">Penulis:</label>
          <input type="text" id="author" value={newAuthor} onChange={handleNewAuthorChange} />
        </div>
        <div>
          <label htmlFor="image">Gambar:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {previewImage ? <img src={previewImage} alt="Preview"/> : <img src={currentPost.image} alt="Preview"/>}
        </div>
      </form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      //   <div>
      //   <h1>Edit News</h1>
       
      // </div>
      ) : (
        <div>
      <Button variant="primary" onClick={handleShow}>
        Post News 
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post News</Modal.Title>
        </Modal.Header>
        <Modal.Body><form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Judul:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="content">Isi:</label>
          <textarea id="content" value={content} onChange={handleContentChange} />
        </div>
        <div>
          <label htmlFor="author">Penulis:</label>
          <input type="text" id="author" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label htmlFor="image">Gambar:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {previewImage && <img src={previewImage} alt="Preview" />}
        </div>
        {/* <button type="submit">Post News</button> */}
        </form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>)}
      <h1>Table News</h1>
      <PostTable posts={posts} deletePost={deletePost} editPost={editPost}/>
      <Modal>
        <Modal.Header closeButton>
        <Modal.Title>
          
        </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default Test
import React,{useState} from "react";
import {Table,Row,Collapse} from 'react-bootstrap'

const PostTable = ({ posts, deletePost, editPost }) => {

  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleRowClick = (index) => {
    console.log("click",index)
    setOpenRowIndex(index === openRowIndex ? null : index);
  };

  
  return (
    <Table striped bordered hover>
            <thead>
            {/* <Row> */}
        <tr>
          <th>ID</th>
          <th style={{width: '12%'}}>Title</th>
          <th style={{width: '50%'}}>Content</th>
          <th style={{width: '10%'}}>Author</th>
          <th>Date</th>
          <th>image</th>
          <th>Actions</th>
        </tr>
        {/* </Row> */}
      </thead>
      <tbody>
      {/* <Row> */}

        {posts.map((post) => (
          <tr onClick={() => handleRowClick(post.id)} key={
post.id}>
<td >{post.id}</td>
<td>
  {post.judul}
  </td>
<td >
  <div >
  {post.isi}
  </div>
</td>
<td>{post.penulis}</td>
<td>{post.tanggal}</td>
<td>
    <img className="table-image"src={`${post.photo}`} style={{ width: "100px", height: "100px", objectFit: "cover" }}/>
    {/* {post.image} */}
</td>
<td>
<button onClick={() => editPost(post)}>Edit</button>
<button onClick={() => deletePost(post.id)}>Delete</button>
</td>
</tr>
))}
        {/* </Row> */}
        
</tbody>
    </Table>
//     <table>

// </table>
);
};

export default PostTable;
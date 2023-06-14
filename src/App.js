import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home,PostForm,Test,Order } from "./page";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test/>}/>
        <Route path="/test" element={<Home/>}/>
        <Route path="/post" element={<PostForm/>}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </Router>
  );
}

export default App;

import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { BsCloud } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../src/components/UserContext";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
const ImageUpload = () => {
  const filePath = useRef();
  const {user} = useUser();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    setId(user?.user?.email);
  },[user]);
  const Upload = async(e)=>{
   e.preventDefault();
   const formData = new FormData();
   console.log(filePath.current)
    formData.append("file", filePath.current.files[0]);
    formData.append("email", id);
   try{
     const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/upload",{
      method: "POST",
       body: formData
     })
     const response = await request.json();
     if(request.ok == false){
       Swal.fire({
         title: "Request",
         text: response.message,
         icon: 'error'
       })
     }else{
       Swal.fire({
         title: "Request",
         text: response.message,
         icon: 'success'
       })
      navigate("/");
     }
     
   }catch(err){
    console.error("Internal Server error :", err);
   }
  }
  return (
    <div style={{ backgroundColor: '#166C96', backgroundPosition: 'center', height: '56.96rem'}}>
      <Navbar style={{ backgroundColor: "#1b2651", color: "#edeae1" }}>
        <Container>
          <h4>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </h4>
          <h6>You want to upload image</h6>
        </Container>
      </Navbar>
      <div className="container card mt-2" style={{position: 'relative'}}>
        <FaUser style={{ fontSize: '40px' }} className="mt-3 text-success"/>
        <form onSubmit={Upload} className="card mt-2 p-3" style={{ border: 'none', backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651" }}>
          <div className="d-flex align-items-center justify-content-center p-3"> 
            <input type="file" ref={filePath} accept="/*" className="mt-2"/>
            <button type="submit" style={{ background: 'transparent', border: 'none', fontSize: '30px', position: 'absolute', marginTop: '91px', boxShadow: "-1px 1px 2px 1px #1b2651", backgroundColor: 'white'}}><BsCloud /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ImageUpload;

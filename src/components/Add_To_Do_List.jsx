import { useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LuClipboardList } from "react-icons/lu";
import { useUser } from "./UserContext";
const Add_To_Do_List = () => {
  const nameRef = useRef("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();
  const AddedName = async (e) => {
    if (nameRef.current.value == "") {
      setMsg("Please! fill input field");
      setTimeout(() => {
        setMsg("");
      }, 1000);
    }
    e.preventDefault();
    try {
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/postname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        credentials: 'include',
        body: JSON.stringify({ name: nameRef.current.value })
      })
      const response = await request.json();
      console.log(request)
      if (request.ok == false){
         Swal.fire({
          title: response.message,
          text: 'Please Try again!',
          icon: 'error'
         })
      }else{
        Swal.fire({
          title: response.message,
          text: 'Adding in the list Successfully!',
          icon: 'success'
        })
        navigate("/list");
      }
      
    } catch (err) {
      console.error("Internal Server error:", err);
    }
  }
  console.log("user :", user);
  return (
    <div style={{ backgroundColor: '#166c96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link></h4>
          <h4>Create List In ToDo List Website</h4>
        </Container>
      </Navbar>
      <br />
      <form onSubmit={AddedName} className="container card form-group" validate style={{padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        <LuClipboardList style={{ fontSize: '50px', color: '#166c96', boxShadow: '-3px 3px 3px 3px #1b2651', cursor: 'pointer'}}/>
        <h3 className="text-center">ToDo-List Website</h3>
        <p className="text-danger text-center">{msg}</p>
        <label htmlFor="name" className="text-center" style={{ color: '#1b2651', fontSize: '18px', fontWeight: 'bold' }}>Add Somethings:</label><br />
        <input type="text" className="form-control" htmlFor="name" name="name" ref={nameRef} style={{ padding: '12px', textAlign: 'center', fontSize: '18px' }} /><br />
        <button type="submit" className="form-control" style={{ backgroundColor: '#166c96', color: '#edeae1', padding: '12px', fontSize: '18px' }}>Add</button>
      </form>
    </div>
  )
}

export default Add_To_Do_List;

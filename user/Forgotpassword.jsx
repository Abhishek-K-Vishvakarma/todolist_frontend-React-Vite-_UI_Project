import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Forgotpassword = () => {
  const emRef = useRef();
  const navigate = useNavigate();
  const handleForgotPassword = async(e) => {
    e.preventDefault();
    if(emRef.current.value == ""){
       Swal.fire({
        title: "Invalid!",
        text: "Please fill input field!",
        icon: 'error'
       });
       return;
    }
    try {
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emRef.current.value })
      });
      const response = await request.json();
      console.log(" Forgot response :", response);
      if(request.ok == false){
         Swal.fire({
          title: 'Request Error',
          text: 'Try again letter',
          icon: 'error'
         })
      }else{
        Swal.fire({
          title: 'Request Success',
          text: 'Forgot Successfully!',
          icon: 'success'
        });
        navigate("/reset-password");
      }
    } catch (err) {
      console.error("Internal Server error :", err);
    }
  }
  // console.log("forgot :", authUser);
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Forgot Passowrd in TODO List Website</h4>
        </Container>
      </Navbar>
      <div className="container card mt-5" style={{ padding: "30px", backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651", maxWidth: "800px" }}>
        <form onSubmit={handleForgotPassword}>
          <label>Enter Email-Id</label>
          <input type="text" ref={emRef} className="form-control p-2 fs-5"/><br/>
          <button type="submit" className="btn btn-primary">Forgot Now</button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword;

import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useUser } from "../src/components/UserContext";
const Resetpassword = () => {
  const newPasswordRef = useRef();
  const navigate = useNavigate();
  const data = localStorage.getItem("forgotPassword");
  const res = JSON.parse(data);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPass = newPasswordRef.current.value.trim();
    if (!newPass) {
      Swal.fire("Error", "Password field cannot be empty", "error");
      return;
    }
    try {
      const response = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/reset-password/${res?.resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ password: newPasswordRef.current.value }),
      });
      const data = await response.json();
      if (response.ok == false) {
        Swal.fire("Error", data.message, "error");
      } else {
        Swal.fire("Success", data.message, "success");
        localStorage.removeItem("forgotPassword");
        navigate("/login");
      }
    } catch (err) {
      console.error("Internal Server error:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>TODO List Website</h4>
        </Container>
      </Navbar>
      <div className="container card mt-5" style={{ padding: "30px", backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651", maxWidth: "800px" }}>
        <form onSubmit={handleResetPassword}>
          <label>Enter New Password</label>
          <input type="text" ref={newPasswordRef} className="form-control p-2 fs-5" /><br />
          <button type="submit" className="btn btn-primary">Reset new Password</button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword;

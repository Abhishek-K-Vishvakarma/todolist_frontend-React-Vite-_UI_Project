import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../src/components/Auth";
const Forgotpassword = () => {
  const emRef = useRef();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { ResetToken } = useAuth();
  const handleForgotPassword = async(e) => {
    e.preventDefault();
    try {
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emRef.current.value })
      });
      const response = await request.json();
      ResetToken(response.resetToken);
      if (!request.ok) {
        let timerInterval;
        Swal.fire({
          title: response.message,
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${ Swal.getTimerLeft() }`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
      navigate("/reset-password");
    } catch (err) {
      console.error("Internal Server error :", err);
    }
  }
  console.log("forgot :", authUser);
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Forgot Passowrd in TODO List Website</h4>
        </Container>
      </Navbar>
      <div className="container card mt-5" style={{ padding: "30px", backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651", maxWidth: "800px" }}>
        <form onSubmit={handleForgotPassword}>
          <label>Email-Id</label>
          <input type="text" ref={emRef} value={authUser?.email} className="form-control p-2 fs-5" disabled/><br/>
          <button type="submit" className="btn btn-primary">Forgot Now</button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword;

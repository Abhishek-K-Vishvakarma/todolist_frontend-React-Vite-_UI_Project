import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Forgotpassword = () => {
  const emRef = useRef();
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const email = emRef.current.value.trim();

    if (!email) {
      Swal.fire({
        title: "Invalid Input!",
        text: "Please enter your registered email address.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const response = await request.json();
      console.log("Forgot Password Response:", response);
      localStorage.setItem("forgotPassword", JSON.stringify(response));
      if (!request.ok) {
        Swal.fire({
          title: "Request Failed!",
          text: response.message || "Something went wrong. Please try again.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        title: "Email Sent!",
        text: "A password reset link has been sent to your email. Please check your inbox.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/reset-password");
    } catch (err) {
      console.error("Internal Server Error:", err);
      Swal.fire({
        title: "Server Error",
        text: "Unable to process your request at this time.",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#166C96", minHeight: "100vh" }}>
      {/* Header Navbar */}
      <Navbar style={{ backgroundColor: "#1b2651", color: "#edeae1" }}>
        <Container className="d-flex justify-content-between align-items-center">
          <h4>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </h4>
          <h4>Forgot Password - ToDo List</h4>
        </Container>
      </Navbar>

      {/* Forgot Password Form */}
      <div
        className="container card mt-5"
        style={{
          padding: "30px",
          backgroundColor: "#edeae1",
          boxShadow: "-3px 3px 3px 3px #1b2651",
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleForgotPassword}>
          <label className="fw-bold mb-2">Enter your registered Email</label>
          <input
            type="email"
            ref={emRef}
            placeholder="example@gmail.com"
            className="form-control p-2 fs-5 mb-3"
          />
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;

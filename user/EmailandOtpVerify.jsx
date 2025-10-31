import { useRef } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../src/components/Auth";
const EmailandOtpVerify = () => {
  const emRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const {users} = useAuth();
  const submitVerify = async (e) => {
    e.preventDefault();
    const obj = {
      email: emRef.current.value,
      otp: otpRef.current.value,
      isVerified: true
    }
    try {
      const request = await fetch("http://localhost:5005/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      const response = await request.json();
      if (request.ok == false) {
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
      } else {
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
        emRef.current.value = "";
        otpRef.current.value = "";
        navigate("/login");
      }
    } catch (err) {
      console.log("Internal Server Error :", err);
    }
  }
  const ResendOTP = async () => {
    if (users.isVerified == true) {
      alert("Already verified!");
      return;
    }
    try {
      const request = await fetch(`http://localhost:5005/api/resend/${users._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });
      const response = await request.json();
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
      console.log(response);
    } catch (err) {
      console.log("Internal Server error :", err);
    }
  }
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Verify Email via OTP in To-Do-List</h4>
        </Container>
      </Navbar>
      <br/>
      <div className='container card' style={{ padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
      <form onSubmit={submitVerify}>
        <label>Email</label>
        <input type='text' className='form-control' ref={emRef}/><br />
        <label>OTP</label>
        <input type='text' className='form-control' ref={otpRef}/><br />
        <div className="row d-flex">
        <div className="col-md-6">
            <button type='submit' className='btn btn-success w-100'>Verify</button>
        </div>
        </div>
      </form>
        <button onClick={ResendOTP} className="btn btn-primary mt-1" style={{width: '38.55rem'}}>Resend-OTP</button>
      </div>
    </div>
  )
}

export default EmailandOtpVerify

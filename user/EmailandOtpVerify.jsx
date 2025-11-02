import { useRef, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useUser } from "../src/components/UserContext";
const EmailandOtpVerify = () => {
  const emRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  // const {user} = useUser();
  const [id, setId] = useState("");
  const submitVerify = async (e) => {
    e.preventDefault();
    const obj = {
      email: emRef.current.value,
      otp: otpRef.current.value,
      isVerified: true
    }
    try {
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/verify", {
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
  fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/users")
  .then(e=> e.json())
  .then((data)=>{
   const find = data.users.find(e=> e.otp && e.isVerified == false);
   setId(find);
  });

  const ResendOTP = async () => {
    // if (signup?.savedUser?.isVerified == true) {
    //   Swal.fire({
    //     title: "Invalid Request!",
    //     text: "Already Verified",
    //     icon: 'error',
    //     timer: 2000
    //   });
    //   return;
    // }
    try {
      const request = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/resend/${id?._id}`, {
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
  // console.log(signup?.savedUser?._id);
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Verify Email via OTP in To-Do-List</h4>
        </Container>
      </Navbar>
      <br />
      <div className='container card' style={{ padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        <form onSubmit={submitVerify}>
          <label>Email</label>
          <input type='text' className='form-control' ref={emRef} /><br />
          <label>OTP</label>
          <input type='text' className='form-control' ref={otpRef} /><br />
          <div className="row d-flex">
            <button type='submit' className='btn btn-success' style={{ width: '100%' }}>Verify-OTP</button>
          </div>
        </form>
        <button onClick={ResendOTP} className="btn btn-primary mt-1">Resend-OTP</button>
      </div>
    </div>
  )
}

export default EmailandOtpVerify

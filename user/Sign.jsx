import { useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../src/components/Auth";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
const Sign = () => {
  const nRef = useRef()
  const emRef = useRef();
  const passRef = useRef();
  const genRef = useRef();
  const ageRef = useRef();
  const navigate = useNavigate();
  const { UserData } = useAuth();
  const [a, setA] = useState('password');
  const SubmitSignUp = async (e) => {
    e.preventDefault();
    if (nRef.current.value == "" || emRef.current.value == "" || passRef.current.value == "" || genRef.current.value == "" || genRef.current.value == ""){
      let timerInterval;
      Swal.fire({
        title: "All fields must be required!",
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
      return;
    }
    if(!/^[a-zA-Z]+$/.test(nRef.current.value) || !nRef.current.value ){
      document.getElementById("nerror").innerHTML = "Please Enter a fullname in alphabatic format";
      return;
    }else{
      document.getElementById("nerror").innerHTML = "";
    }
    if (!/^[a-z0-9]+[@]+[a-z]+[.]+[a-z]+$/.test(emRef.current.value) || !emRef.current.value) {
      document.getElementById("mailerror").innerHTML = "Please Enter a email format with one special symbol., (@)";
      return;
    }else{
      document.getElementById("mailerror").innerHTML = "";
    }
    if (!/^[a-z0-9|^|!|@|$|&]{8}$/.test(passRef.current.value) || !passRef.current.value) {
      document.getElementById("passerror").innerHTML = "Password must be at least 8 characters and include any one special character., (^/!/@/$/&)";
      return;
    }else{
      document.getElementById("passerror").innerHTML = "";
    }
    if (!/^[0-9]{2}$/.test(ageRef.current.value) || !ageRef.current.value) {
      document.getElementById("ageerror").innerHTML = "Password must be at least 2 digits age only";
      return;
    } else {
      document.getElementById("ageerror").innerHTML = "";
    }

    const obj = {
      name: nRef.current.value,
      email: emRef.current.value,
      password: passRef.current.value,
      gender: genRef.current.value,
      age: ageRef.current.value * 1
    }
    try {
      const request = await fetch("http://localhost:5005/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      const response = await request.json();
      UserData(response.savedUser);
      if(request.ok == false){
        let timerInterval;
        Swal.fire({
          title: response.message,
          html: "I will close in <b></b> milliseconds.",
          timer: 3000,
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
      }else{
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
        navigate("/verify");
      }
      console.log(response);
    } catch (err) {
      console.error("Internal Server error :", err);
    }
  }
  const Eye = () => {
    if(passRef.current.value == ""){
      let timerInterval;
      Swal.fire({
        title: "Please fill password input field after see password",
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
       return
    }
    setA(a === 'text' ? 'password' : 'text'); 
    // console.log(a === 10 ? 20 : 10);
  };
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Sign Up in To-Do-List</h4>
        </Container>
      </Navbar>
      <br />
      <form onSubmit={SubmitSignUp} className="container card" style={{ padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        <h4 className="text-center" style={{ color: '#1b2651' }}>You have not any Square Accounts? Sign Up</h4><br />
        <label><span className="text-danger">*</span> Enter FullName</label><p id="nerror" className="text-danger"></p>
        <input type="text" className="form-control" ref={nRef}/><br />
        <label><span className="text-danger">*</span>Enter Email</label><p id="mailerror" className="text-danger"></p>
        <input type="text" className="form-control" ref={emRef}/><br />
        <label><span className="text-danger">*</span>Enter Password</label><p id="passerror" className="text-danger"></p>
        <input type={a} className="form-control" ref={passRef} />{a == 'password' ? <a onClick={Eye} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-block', marginLeft: '5px' }}><FaEye /></a> : <a onClick={Eye} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-block', marginLeft: '5px' }}><LuEyeClosed /></a>}<br />
        <label>Choose Gender <span className="text-secondary">(Optional)</span></label>
        <select type="text" className="form-control" ref={genRef}>
          <option></option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <br />
        <label>Enter Age <span className="text-secondary">(Optional)</span></label><p id="ageerror" className="text-danger"></p>
        <input type='text' className="form-control" ref={ageRef}/><br />
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  )
}

export default Sign;

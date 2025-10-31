import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../src/components/Auth";
const Login = () => {
  const emRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const { AuthUserData } = useAuth();
  const LoginUser = async(e)=>{
    e.preventDefault();
    if(emRef.current.value == "" || passRef.current.value == ""){
      let timerInterval;
      Swal.fire({
        title: "All fields must be required!",
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
      return;
    }
    const obj = {
    email : emRef.current.value,
    password : passRef.current.value
    }
    try{
      const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
        credentials: "include",
       });
       const response = await request.json();
       AuthUserData(response.login);
       console.log("Login response :", response);
       if(!request.ok){
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
               navigate("/");
             }
    }catch(err){
     console.log("Internal Server error :", err);
    }
  }
  return (
    <div style = {{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Sign in To-Do-List</h4>
        </Container>
      </Navbar><br/>
      <form onSubmit={LoginUser} className="container card" style={{ padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        <label>Enter Email</label>
        <input type="text" className="form-control" ref={emRef}/><br/>
        <label>Enter Password</label>
        <input type="password" className="form-control" ref={passRef} /><br/>
        <button type="submit" className="btn btn-success">Sign in</button><br/>
        <p>You have not any square account? <Link to="/sign">Sign Up</Link></p>
        <p>Click at the link! forgot your password <Link to="/forgot-password">Forgot-Password</Link></p>
      </form>
    </div>
  )
}

export default Login

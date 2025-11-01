// import { useRef } from "react";
// import { Container, Navbar } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAuth } from "../src/components/Auth";

// const Login = () => {
//   const emRef = useRef();
//   const passRef = useRef();
//   const navigate = useNavigate();
//   const { AuthUserData } = useAuth();

//   const LoginUser = async (e) => {
//     e.preventDefault();
//     if (!emRef.current.value || !passRef.current.value) {
//       Swal.fire({
//         title: "All fields are required!",
//         icon: "warning",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     const obj = {
//       email: emRef.current.value,
//       password: passRef.current.value,
//     };

//     try {
//       const request = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(obj),
//         }
//       );

//       const text = await request.text();
//       let response;
//       try {
//         response = JSON.parse(text);
//       } catch (err) {
//         Swal.fire("Server Error", "Invalid response from server.", "error", err);
//         return;
//       }
//       AuthUserData(response.login);
//       if (!request.ok) {
//         Swal.fire({
//           title: "Login Failed",
//           text: response.message || "Something went wrong!",
//           icon: "error",
//           timer: 3000,
//         });
//         return;
//       }else{
//         Swal.fire({
//           title: response.message || "Login Successful!",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         navigate("/");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Unable to connect to the server.", "error", err);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#166C96", height: "56.96rem" }}>
//       <Navbar style={{ backgroundColor: "#1b2651", color: "#edeae1" }}>
//         <Container>
//           <h4>
//             <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
//               Home
//             </Link>
//           </h4>
//           <h4>Sign in To-Do-List</h4>
//         </Container>
//       </Navbar>
//       <br />
//       <form
//         onSubmit={LoginUser}
//         className="container card"
//         style={{
//           padding: "30px",
//           backgroundColor: "#edeae1",
//           boxShadow: "-3px 3px 3px 3px #1b2651",
//         }}
//       >
//         <label>Enter Email</label>
//         <input type="text" className="form-control" ref={emRef} />
//         <br />
//         <label>Enter Password</label>
//         <input type="password" className="form-control" ref={passRef} />
//         <br />
//         <button type="submit" className="btn btn-success">
//           Sign in
//         </button>
//         <br />
//         <p>
//           You don't have an account? <Link to="/sign">Sign Up</Link>
//         </p>
//         <p>
//           Forgot password?{" "}
//           <Link to="/forgot-password">Forgot-Password</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { Container, Navbar } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Logout = () => {
//   const navigate = useNavigate();

//   const LogoutUser = async () => {
//     try {
//       const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (res.ok){
//         Swal.fire({
//           title: "Logout Successful!",
//           html: "Redirecting to login page...",
//           timer: 2000,
//           timerProgressBar: true,
//           didOpen: () => Swal.showLoading(),
//         });
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         Swal.fire("Error", data.message || "Logout failed", "error");
//       }
//     } catch (err) {
//       console.error("Internal server error:", err);
//       Swal.fire("Error", "Something went wrong while logging out!", "error");
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
//           <h4>Logout from your website</h4>
//         </Container>
//       </Navbar>
//       <br />
//       <div
//         className="container card"
//         style={{
//           padding: "30px",
//           backgroundColor: "#edeae1",
//           boxShadow: "-3px 3px 3px 3px #1b2651",
//         }}
//       >
//         <h4 className="text-center">Logout Now</h4>
//         <br />
//         <button onClick={LogoutUser} className="btn btn-danger">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Logout;

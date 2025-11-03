import { useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LuClipboardList } from "react-icons/lu";
import { useUser } from "./UserContext";

const Add_To_Do_List = () => {
  const nameRef = useRef("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useUser(); // ✅ Getting user data (contains token)
  // console.log("User token :", user?.token)
  const AddedName = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    if (name === "") {
      setMsg("Please fill the input field!");
      setTimeout(() => setMsg(""), 2000);
      return;
    }

    try {
      const response = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/postname",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ user?.token }`,
          },
          credentials: "include",
          body: JSON.stringify({ name: name }),
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      // ✅ Handle Errors
      if (!response.ok || data.status === false) {
        Swal.fire({
          title: "Error!",
          text: data.message || "Something went wrong!",
          icon: "error",
        });
        return;
      }

      // ✅ Success message
      Swal.fire({
        title: "Success!",
        text: data.message || "Item added successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Clear input
      nameRef.current.value = "";

      // ✅ Redirect to list page
      setTimeout(() => navigate("/list"), 2000);
    } catch (err) {
      console.error("Internal Server Error:", err);
      Swal.fire({
        title: "Server Error!",
        text: "Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#166c96", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: "#1b2651", color: "#edeae1" }}>
        <Container className="d-flex justify-content-between">
          <h4>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </h4>
          <h4>Create To-Do Item</h4>
        </Container>
      </Navbar>

      {/* Form */}
      <div
        className="container card mt-5"
        style={{
          padding: "30px",
          backgroundColor: "#edeae1",
          boxShadow: "-3px 3px 3px 3px #1b2651",
          maxWidth: "800px",
        }}
      >
        <form onSubmit={AddedName}>
          <div className="text-center mb-4">
            <LuClipboardList
              style={{
                fontSize: "50px",
                color: "#166c96",
                boxShadow: "-3px 3px 3px 3px #1b2651",
                borderRadius: "10px",
              }}
            />
          </div>

          <h3 className="text-center mb-3">To-Do List Website</h3>
          {msg && <p className="text-danger text-center">{msg}</p>}

          <label
            htmlFor="name"
            className="form-label fw-bold"
            style={{ color: "#1b2651", fontSize: "18px" }}
          >
            Add Something:
          </label>
          <input
            type="text"
            id="name"
            className="form-control text-center mb-3"
            ref={nameRef}
            placeholder="Enter your task"
            style={{ padding: "12px", fontSize: "18px" }}
          />

          <button
            type="submit"
            className="form-control btn"
            style={{
              backgroundColor: "#166c96",
              color: "#edeae1",
              padding: "12px",
              fontSize: "18px",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_To_Do_List;

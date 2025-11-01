import { useState } from "react";
import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RiShieldUserFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [u, setU] = useState();
  const g = async () => {
    const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/profile", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (data.status_code == 401) {
        window.location.href = "/login";
    }
    return data;
  };
  g().then((e) => setU(e?.user));    
  const SetUserData = () => {
    setName(u?.name);
    setEmail(u?.email);
  };
  const HandleSaveEditUserProfile = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      let timerInterval;
      Swal.fire({
        title: "All fields are required to update your profile.",
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
    try {
      const request = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/edituser/${u?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name: name, email: email })
      });
      const response = await request.json();
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
        setName("");
        setEmail("");
      }
      console.log(response);
    } catch (err) {
      console.log("Internal Server error :", err);
    }
  }
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>TODO List Website</h4>
        </Container>
      </Navbar>
      <div className="container card mt-5" style={{ padding: "30px", backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651", maxWidth: "800px" }}>
        <div className="d-flex flex-column align-items-center">
          <div style={{ textAlign: "left", width: "100%" }}>
            <h3 className="text-center"><RiShieldUserFill className="fs-1" /> User Profile</h3>
            <p style={{ boxShadow: "-2px 2px 1px 5px #1b2651", borderRadius: '100%', width: '100%', height: '2px' }} />
            <p className="mb-2 fs-3"><strong>Full Name:</strong> {u?.name}</p>
            <p className="mb-0 fs-3"><strong>Email ID:</strong> {u?.email}</p>
            <p className="mb-0 fs-3"><strong>Role:</strong> {u?.role}</p>
            <p className="mb-0 fs-3"><strong>Gender:</strong> {u?.gender}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="container card p-5" style={{ padding: "30px", backgroundColor: "#edeae1", boxShadow: "-3px 3px 3px 3px #1b2651", maxWidth: "800px" }}>
          <button onClick={SetUserData} style={{ background: 'none', fontSize: '20px', border: 'none', width: '30%'}} className="d-flex align-items-center gap-2" title="Set User Data in the input fields"><FaRegEdit />Edit Profile-Click</button>
        <form onSubmit={HandleSaveEditUserProfile}>
          <br />
          <label>FullName</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" /><br />
          <label>Email-Id</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" /><br />
          <button type="submit" className="btn btn-success w-100">Save</button>
        </form>
      </div>
    </div>
  )
}

export default UserProfile;

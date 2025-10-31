import { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Swal from "sweetalert2";
const Edit = () => {
  const [n, setN] = useState();
  const [msg, setMsg] = useState();
  const { usename } = useAuth(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (usename) {
      setN(usename.name);
    }
  }, [usename])
  const Save = async (e) => {
    e.preventDefault();
    const request = await fetch(`http://localhost:5005/api/editname/${usename._id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: n})
    })
    let res = await request.json();
    if(res.status == true){
       setMsg("Updated!");
       setTimeout(()=>{
       setMsg("");
       navigate("/list");
       }, 2000);
      setN("");
      let timerInterval;
      Swal.fire({
        title: "Name Updated Succssfully!",
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
      localStorage.removeItem("useName");
    }
    console.log(res);
  }
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Edit To-Do-List</h4>
        </Container>
      </Navbar>
      <br/>
      <form onSubmit={Save} className="container card" style={{ height: '20rem', padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        <p className="text-center text-success">{msg}</p>
        
        <h4 className="text-center">Update List Item's indivisualy</h4>
        <br/>
        <input type="text" className="form-control text-center" value={n} onChange={(e) => setN(e.target.value)}/><br/>
        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  )
}

export default Edit;

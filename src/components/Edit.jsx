// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Swal from "sweetalert2";
const Edit = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [item, setItem] = useState({ _id: "", name: "" });
  useEffect(() => {
    const savedItem = localStorage.getItem("editItem");
    if (savedItem) {
      setItem(JSON.parse(savedItem));
    }
  }, []);
  const Save = async (e) => {
    e.preventDefault();
    const request = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/editname/${item?._id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`
      },
      credentials: 'include',
      body: JSON.stringify({ name: item?.name })
    })
    let res = await request.json();
    if (!request.ok) {
      Swal.fire({
        title: res.message,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: res.message || "Edit Successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/list");
    }
    localStorage.removeItem("useName");
  }
  return (
    <div style={{ backgroundColor: '#166C96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>Edit To-Do-List</h4>
        </Container>
      </Navbar>
      <br />
      <form onSubmit={Save} className="container card" style={{ height: '20rem', padding: '30px', backgroundColor: '#edeae1', boxShadow: '-3px 3px 3px 3px #1b2651' }}>
        {/* <p className="text-center text-success">{msg}</p> */}

        <h4 className="text-center">Update List Item's indivisualy</h4>
        <br />
        <input type="text" className="form-control text-center" value={item.name} onChange={(e) => setItem({...item, name : e.target.value})} /><br />
        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  )
}

export default Edit;

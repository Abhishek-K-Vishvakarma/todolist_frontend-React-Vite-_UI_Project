import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Swal from "sweetalert2";
const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { NameObjects } = useAuth();
  useEffect(()=>{
    fetch("http://localhost:5005/api/getname")
      .then(e => e.json())
      .then((data) => {
        setList(data.findAllName);
      })
  }, []);

  const DelName = async(id)=>{

    await fetch(`http://localhost:5005/api/deletename/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    setList(list.filter(p=> p._id !== id));
    let timerInterval;
      Swal.fire({
        title: "Deleted Successfully!",
        html: "I will close in <b></b> milliseconds.",
        timer: 1000,
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
  }

  const Nameset = (data)=>{
    NameObjects(data);
    navigate("/edit");
  }
  return (
    <div style={{ backgroundColor: '#166c96', height: '56.96rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>To-Do-List</h4>
        </Container>
      </Navbar>
      <br />
      <table className="container table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>SR NO.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((e,i)=>{
              return (
                <tr>
                  <td>{i+1}</td>
                  <td>{e.name}</td>
                  <td>
                    <button type="submit" onClick={() => DelName(e._id)} className="btn btn-danger">Delete</button> || <button type="submit" className="btn btn-success" onClick={() => Nameset(e)}>Edit</button>
                    {/* <Link to="/edit" style={{ textDecoration: 'none'}}>Edit</Link> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default List;

import { Container, Navbar } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import { FaUserShield } from "react-icons/fa";
import { TbPencilCheck } from "react-icons/tb";
import { MdPlaylistAdd } from "react-icons/md";
import { RiFindReplaceLine } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [u, setU] = useState();
  useEffect(()=>{
    const g = async () => {
      const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/profile",{
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (data.status_code == 401) {
        Swal.fire({
          title: 'Auto Logout!',
          text: 'Please Login Again',
          icon: 'warning',
          timer: 2000
        }).then(function(){
          window.location.href = '/login';
        })
        
      }
      return data;
    };
    g().then((e) => setU(e?.user));
  },[]);
  return (
    <div style={{ backgroundColor: '#166C96', height: '55.98rem' }}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h4><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h4><h4>TODO List Website</h4><Link to="/userprofile" className="d-flex align-items-center justify-content-center gap-2 fs-3" style={{ textDecoration: 'none', color: 'white' }}><FaRegCircleUser />Profile</Link>
        </Container>
      </Navbar>
      <Sidebar />
      <h2 className="container text-center d-flex gap-2 justify-content-center align-items-center" style={{ color: '#edeae1' }}>Hi there! I'm <LuCircleUserRound style={{ fontSize: '4rem', color: '#1b2651' }} />"{u?.name}"</h2>
      <div className="container card text-center" style={{ boxShadow: '-3px 4px 4px 2px #1b2651', height: '20rem', backgroundColor: '#edeae1', color: '#1b2651', border: 'none' }}>
        <br />
        <h3 className="d-flex align-items-center justify-content-center gap-2"><FaUserShield />The Amazing! To-Do List</h3>
        <br />
        <div className="container row mt-4">
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><MdPlaylistAdd /> Add Your Choice Materials</h5>
          </div>
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><TbPencilCheck />Edit Config List</h5>
          </div>
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><RiFindReplaceLine />Find Management of the List Item's</h5>
          </div>
        </div>
        <div className="container row mt-5">
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><IoIosRemoveCircle />Remove List item indivisualy</h5>
          </div>
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><BsReverseListColumnsReverse />Operations of Facility</h5>
          </div>
          <div className="col-md-4">
            <h5 className="d-flex align-items-center justify-content-center gap-2"><FaReact />UI For better Experience</h5>
          </div>
        </div>
      </div>
      <br /><br />
      <div className="d-flex justify-content-center row gap-4 text-center">
        <div className="col-md-4 card" style={{ boxShadow: '-3px 4px 4px 2px #1b2651',backgroundColor: '#edeae1', color: '#1b2651', border: 'none' }}>
          <img src="/addtodolist.png" style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
        </div>
        <div className="col-md-4 card" style={{ boxShadow: '-3px 4px 4px 2px #1b2651',backgroundColor: '#edeae1', color: '#1b2651', border: 'none' }}>
          <img src="/list.png" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '19.3vh'}} />
        </div>
      </div>
    </div>
  )
}

export default Home;

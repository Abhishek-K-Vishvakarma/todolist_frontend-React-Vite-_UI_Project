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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { IoLogoLinkedin } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    const g = async () => {
      try {
        const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data?.status_code == 401) {
          navigate("/login");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    g()
  }, [navigate]);
  return (
    <div style={{ backgroundColor: '#166C96', backgroundPosition: 'center'}}>
      <Navbar style={{ backgroundColor: '#1b2651', color: '#edeae1' }}>
        <Container>
          <h5><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></h5><h5>To-Do List</h5><Link to="/userprofile" className="d-flex align-items-center justify-content-center gap-2 fs-5" style={{ textDecoration: 'none', color: '#edeae1', fontWeight: 'bold' }}><FaRegCircleUser />Profile</Link>
        </Container>
      </Navbar>
      <Sidebar />
      <h4 className="text-center d-flex gap-1 justify-content-center align-items-center" style={{ color: '#edeae1' }}>Hi, I'm <LuCircleUserRound style={{ fontSize: '3rem', color: '#1b2651' }} />{user?.user?.name}</h4>
      <div className="container card text-center p-5 mt-5" style={{ boxShadow: '-3px 4px 4px 2px #1b2651', backgroundColor: '#edeae1', color: '#1b2651', border: 'none', borderRadius: '0px' }}>
        <br />
        <h5 className="d-flex align-items-center justify-content-center fs-3"><FaUserShield />The Amazing!</h5>
        <br />
        <div className="row mt-2">
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><MdPlaylistAdd className="me-4" /> Add List</h6>
          </div>
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><TbPencilCheck className="me-4" />Edit List</h6>
          </div>
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><RiFindReplaceLine className="me-4" />Find of the item</h6>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><IoIosRemoveCircle className="me-4" />Remove List item</h6>
          </div>
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><BsReverseListColumnsReverse className="me-4" />Actions Facilities</h6>
          </div>
          <div className="col-md-4">
            <h6 className="d-flex align-items-center gap-5 p-2" style={{ boxShadow: '-2px 2px 4px 2px #1b2651' }}><FaReact className="me-4" />Best UI</h6>
          </div>
        </div>
      </div>
      <br />
      <footer
        className="card border-0 rounded-0"
        style={{
          padding: "2rem 4rem",
          backgroundColor: "#1b2651",
          color: "#edeae1",
          marginTop: '23.88rem'
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h5 className="mb-0">&copy; 2025 todo19.web</h5>
          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <IoLogoLinkedin
                style={{ width: "40px", height: "40px", color: "#edeae1" }}
              />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaSquareFacebook
                style={{ width: "38px", height: "38px", color: "#edeae1" }}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <SiInstagram
                style={{ width: "36px", height: "36px", color: "#edeae1" }}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;

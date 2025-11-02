import { useState } from "react";
import { Accordion, Offcanvas } from "react-bootstrap";
import { GoSidebarCollapse } from "react-icons/go";
import { CloseButton } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoVersions } from "react-icons/go";
import { IoIosList } from "react-icons/io";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { MdManageAccounts } from "react-icons/md";
import { MdNoAccounts } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const navigate = useNavigate();
  const logout = async()=>{
    const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log(res);
    navigate("/sign");
  }
  return (
    <div>
      <p className="d-flex align-items-center gap-2" style={{ color: '#edeae1', boxShadow: '-3px 3px 4px 3px #1b2651' }}><GoSidebarCollapse onClick={show} style={{ fontSize: '35px', color: '#edeae1', cursor: 'pointer'}} /><b>TaskBoard</b></p>
      <Offcanvas show={open}>
        <div className="container my-3">
          <div className="row justify-content-center align-items-center text-center bg-light p-3 rounded shadow-sm">
            <div className="col-md-3 col-4">
              <h5 className="mb-0">Menu</h5>
            </div>
            <div className="col-md-6 col-4">
              <h6 className="mb-0 fw-bold">ToDo List</h6>
            </div>
            <div className="col-md-3 col-4 d-flex justify-content-end">
              <CloseButton
                onClick={hide}
                style={{
                  boxShadow: "0px 0px 5px 2px #bbb",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <br />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header><b>Home</b></Accordion.Header>
            <Accordion.Body>
              <GoVersions /> Overview
            </Accordion.Body>
            <Accordion.Body>
              <MdFormatListBulletedAdd /> <Link to="/add" style={{ textDecoration: 'none' }}>Add </Link>
            </Accordion.Body>
            <Accordion.Body>
              <IoIosList /> <Link to="/list" style={{ textDecoration: 'none'}}>List</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><b>Settings</b></Accordion.Header>
            <Accordion.Body>
              {/* <MdNoAccounts /> <Link to="/sign" style={{ textDecoration: 'none' }}>Sign Up?</Link> */}
            <MdNoAccounts /> <a type="button" onClick={logout} style={{ textDecoration: 'none', color: 'blue'}}>Sign up</a>
            </Accordion.Body>
            <Accordion.Body>
              <MdManageAccounts /> <Link to="/login" style={{ textDecoration: 'none' }}>Sign in?</Link>
            </Accordion.Body>
            <Accordion.Body>
              <LuLogOut /> <Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="text-center mt-auto">
          <small>© 2025 todo19.web</small>
        </div>
      </Offcanvas>
    </div>
  )
}

export default Sidebar;

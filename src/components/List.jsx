import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "./UserContext";

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const {user} = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/getname", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}` 
          }
        });
        const data = await res.json();
        console.log(data);
        const f = data.findAllName.map(e=> e.list);
        setList(f[0]);
      } catch (err) {
        console.error("Fetch error:", err);
      } 
    };

    fetchData();
  }, [user]);

  const DelName = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/deletename/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ user?.token }`
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire("Error", data.message || "Failed to delete!", "error");
        return;
      }
      console.log(list)
      setList(list.filter(u=> u._id != id));
      Swal.fire({
        title: "Deleted Successfully!",
        timer: 1200,
        showConfirmButton: false,
        icon: "success",
      });
      navigate(0);
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", "Internal Server Error", "error");
    }
  };
  
  const Nameset = (item) => {
    localStorage.setItem("editItem", JSON.stringify(item));
    navigate("/edit");
  };

  return (
    <div style={{ backgroundColor: "#166c96", minHeight: "100vh" }}>
      <Navbar style={{ backgroundColor: "#1b2651", color: "#edeae1" }}>
        <Container>
          <h4>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </h4>
          <h4>To-Do-List</h4>
        </Container>
      </Navbar>
      <div className="container mt-4">
          <table className="table table-hover table-striped table-bordered bg-light">
            <thead className="table-dark text-center">
              <tr>
                <th>SR NO.</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td className="text-center">
                    <button
                      onClick={() => DelName(e._id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => Nameset(e)}
                      className="btn btn-success btn-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};
export default List;

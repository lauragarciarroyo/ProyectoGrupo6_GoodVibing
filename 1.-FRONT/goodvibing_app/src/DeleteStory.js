import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

function DeleteStory() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/api/stories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log({ data });
    }
  };

  return (
    <div className="deletestory" onSubmit={handleSubmit}>
      <NavLink to="/mystories">Eliminar historia</NavLink>
    </div>
  );
}

export default DeleteStory;

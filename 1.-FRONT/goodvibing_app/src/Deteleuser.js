import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

function DeleteUser() {
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <div className="deleteuser" onSubmit={handleSubmit}>
      <NavLink to="/">Eliminar cuenta</NavLink>
    </div>
  );
}

export default DeleteUser;

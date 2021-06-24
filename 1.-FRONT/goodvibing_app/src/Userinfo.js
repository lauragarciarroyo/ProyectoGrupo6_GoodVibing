import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Userinfo() {
  const user = useSelector((s) => s.user);

  return (
    <div className="userinfo">
      <h2>{user.name}</h2>
      <p />
      <p>{user.bio}</p>
      <p>{user.residence}</p>
      <p>{new Date(user.birthdate).toLocaleDateString()}</p>
      <p>{user.email}</p>
      <p />
      <div>
        <Link to={`/viewstories/${user.id}`}>Ver historias del usuario</Link>
      </div>
    </div>
  );
}

export default Userinfo;

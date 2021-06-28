import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

function Userinfo() {
  const { user } = useSelector((s) => s.user);
  const { id } = useParams();

  return (
    <div className="userinfo">
      <h2>{user.name}</h2>
      <p />
      <p align="center">{user.bio}</p>
      <p align="center">{user.residence}</p>
      <p align="center">{new Date(user.birthdate).toLocaleDateString()}</p>
      <p align="center">{user.email}</p>
      <p />
      <div>
        <Grid container justify="center">
          <Link to={`/viewstories/${id}`} align="center">
            Ver historias del usuario
          </Link>
        </Grid>
      </div>
    </div>
  );
}

export default Userinfo;

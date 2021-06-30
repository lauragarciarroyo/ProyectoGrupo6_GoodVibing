import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

function Userinfo() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", message: error.message });
      }
    };

    loadUser();
  }, [token, setUser, dispatch, id]);

  if (!user) return <p>Cargando...</p>;

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

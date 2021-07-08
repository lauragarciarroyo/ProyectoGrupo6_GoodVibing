import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Footer from "./Footer";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "30%",
    type: "submit",
    marginLeft: "600px",
  },
});

function Userinfo() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const { id } = useParams();
  const classes = useStyle();

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

  if (!user) return <p></p>;

  return (
    <div className="userinfo">
      <h3>{user.name}</h3>
      <p />
      <p align="center">{user.bio}</p>
      <p align="center">{user.residence}</p>
      <p align="center">{new Date(user.birthdate).toLocaleDateString()}</p>
      <p align="center">{user.email}</p>
      <p />
      <div>
        <Button
          className={classes.submit}
          type="submit"
          href={`/viewstories/${id}`}
        >
          Ver historias del usuario
        </Button>
      </div>
    </div>
  );
}

<Footer />;

export default Userinfo;

import UseFetch from "./UseFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./ViewStories.css";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "20%",
    type: "submit",
    marginLeft: "650px",
  },
});

function ViewStories() {
  const { user } = useSelector((state) => state.user);
  const classes = useStyle();
  const results = UseFetch(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewstories">
      <h3 className="listahistorias">Historias</h3>
      {results.data.map((e) => (
        <div className="historias" key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </div>
      ))}
      {!results.data.length && <i>No se han encontrado historias</i>}

      <Button className={classes.submit} type="submit">
        Crea tu historia
      </Button>
    </div>
  );
}

export default ViewStories;

//Cada previsualización de una historia te lleva a la historia completa
//Ver las historias de un usuario (la previsualización)

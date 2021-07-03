import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  buttonCreate: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "50%",
    type: "submit",
    marginLeft: "330px",
  },
});

function MyStories() {
  const { user } = useSelector((state) => state.user);
  const classes = useStyle();
  const [results] = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  console.log(results);

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="mystories">
      <h1>Tus historias</h1>

      {results.map((e) => (
        <div className="historias" key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </div>
      ))}

      {!results.length && <i>No se han encontrado historias</i>}

      <Button className={classes.buttonCreate} href="./createstory">
        Crea tu historia
      </Button>
    </div>
  );
}

export default MyStories;

//Ver mis historias, en lista, la previsualización

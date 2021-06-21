import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Button, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

function MyStories() {
  const { user } = useSelector((state) => state.user);

  const results = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  if (!results) return <p>Cargando...</p>;

  return (
    <Container component="main" maxWidth="ml">
      <CssBaseline />
      <div className="Mis historias">
        <h1>Tus historias</h1>

        {results.data.map((e) => (
          <div key={e.id}>
            <Button href={`/mystory/${e.id}`} color="primary">
              {e.title}
            </Button>

            <p>{e.body}</p>
          </div>
        ))}

        {!results.data.length && <i>No se han encontrado historias</i>}

        <div className="bottom">
          <Button href="/createstory" color="secondary">
            Crea tu historia
          </Button>{" "}
        </div>
      </div>
    </Container>
  );
}

export default MyStories;

//Ver mis historias, en lista, la previsualización

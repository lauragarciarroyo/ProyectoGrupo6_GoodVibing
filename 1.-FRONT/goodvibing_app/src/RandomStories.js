import { Link } from "react-router-dom";
import UseFetch from "./UseFetch";

function RandomStories({ q }) {
  const stories = UseFetch(`http://localhost:4000/api/random-stories`);

  if (!stories) return <p>Cargando...</p>;

  return (
    <div className="randomstories">
      <h1>Explora historias aleatorias</h1>
      <div>
        {stories.data.map((s) => (
          <div align="center" key={s.id}>
            <Link to={`/story/${s.id}`}>{s.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomStories;

//Resultado búsqueda de historias en barra de búsqueda de home
//Revisar el link al hacer map

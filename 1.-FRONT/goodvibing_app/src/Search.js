import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import RandomStories from "./RandomStories";

function Search() {
  const { q } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState(q || "");
  const dispatch = useDispatch();
  const recent = useSelector((s) => s.history);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${q}`);
    dispatch({ type: "SEARCH", search });
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Busca una experiencia"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>¡Explora!</button>
      </form>

      {q && <RandomStories q={q} />}
      {!q && recent.length > 0 && (
        <div className="history">
          <h2>Historias</h2>
          <ul>
            {recent.map((s) => (
              <li key={s}>
                <Link to={`/search/${s}`}>{s}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave

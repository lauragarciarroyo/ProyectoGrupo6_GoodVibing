import { useState } from "react";

function Search() {
  const [newEntry, setNewEntry] = useState("");
  const [search, setSearch] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch([...search, newEntry]);
    setNewEntry("");
  };

  return (
    <div className="search">
      <div className="entries">
        {search.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Busca por palabra clave..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave

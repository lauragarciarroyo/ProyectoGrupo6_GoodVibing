import UseFetch from "./UseFetch";
import StoryTitle from "./StoryTitle";

function RandomStories({ q }) {
  const stories = UseFetch(`http://localhost:4000/api/random-stories`);

  if (!stories) return <p>Cargando...</p>;

  return (
    <div className="randomstories">
      <h3>Explora historias aleatorias</h3>
      <div>
        {stories.data.map((s) => (
          <div key={s.id}>
            <StoryTitle href={`/story/${s.id}`}>{s.title}</StoryTitle>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomStories;

//Resultado búsqueda de historias en barra de búsqueda de home
//Revisar el link al hacer map

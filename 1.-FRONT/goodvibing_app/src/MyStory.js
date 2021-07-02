//Ver mi historia, desde aquí se puede editar y borrar
import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import React from "react";
import GetComments from "./GetComments";

function MyStory() {
  const { id } = useParams();

  const [story] = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <h1>{story.title}</h1>
      <p align="center ">{new Date(story.date).toLocaleDateString()}</p>
      <div className="name">
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name}</Link>
      </div>
      <div className="story">{story.body}</div>
      <div className="comment">
        <CreateComment />
        <p />
        <GetComments storyUserId={story.user_id} comments={story.comments} />
      </div>
      <div className="votos">
        <CreateVote />
      </div>
      <p />
      <div>
        <Link to={`/editstory/${id}`}>Editar historia</Link>
        <p />

        <Link to={`/deletestory/${id}`}>Eliminar historia</Link>
      </div>
    </div>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)

//Ver mi historia, desde aquí se puede editar y borrar
import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import CreateVote from "./CreateVote";
import CreateComment from "./CreateComment";
import React from "react";
import GetComments from "./GetComments";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
    marginLeft: "280px",
  },
});

function MyStory() {
  const { id } = useParams();
  const [story] = UseFetchToken(`http://localhost:4000/api/stories/${id}`);
  const classes = useStyle();
  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <h3>{story.title}</h3>
      <p align="center ">{new Date(story.date).toLocaleDateString()}</p>
      <div className="name">
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name}</Link>
      </div>
      <div className="story">{story.body}</div>
      <div className="comment">
        <CreateComment />
        <p />
        <div className="comments">
          <GetComments storyUserId={story.user_id} comments={story.comments} />
        </div>
      </div>
      <div className="votos" align="center">
        <CreateVote />
      </div>
      <p />
      <div>
        <Button
          className={classes.submit}
          type="submit"
          href={`/editstory/${id}`}
        >
          Editar historia
        </Button>
      </div>
      <div>
        <Button
          className={classes.submit}
          type="submit"
          href={`/deletestory/${id}`}
        >
          Eliminar historia
        </Button>
      </div>
    </div>
  );
}

export default MyStory;

//Modificar los links del final (modificar historia y eliminarla)

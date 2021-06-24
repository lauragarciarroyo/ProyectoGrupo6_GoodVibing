import { Redirect, useParams, Link } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";
import CreateComment from "./CreateComment";
import GetComments from "./GetComments";
//import ImageStory from "./ImageStory";

function ViewStory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [story, error] = useFetchToken(
    `http://localhost:4000/api/stories/${id}`
  );
  console.log(story);
  if (error) {
    dispatch({ type: "SET_ERROR", message: error });
    return <Redirect to="/" />;
  }

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story">
      <h1>{story.title}</h1>
      <p>{new Date(story.date).toLocaleDateString()}</p>
      <Link to={`/userinfo/${story.user_id}`}>{story.user_name}</Link>
      <p>{story.body}</p>
      <h2>Comentarios</h2>
      <p>METER AQUI UN COMPONENTE QUE LISTE COMENTARIOS</p>
      <div>
        <CreateComment />
      </div>
    </div>
  );
}

export default ViewStory;

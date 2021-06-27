import { Redirect, useParams, Link } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";
import CreateComment from "./CreateComment";
import GetComments from "./GetComments";
import CreateVote from "./CreateVote";

function ViewStory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [story, error] = useFetchToken(
    `http://localhost:4000/api/stories/${id}`
  );

  if (error) {
    dispatch({ type: "SET_ERROR", message: error });
    return <Redirect to="/" />;
  }

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story">
      <h1 align="center">{story.title}</h1>
      <p align="center">{new Date(story.date).toLocaleDateString()}</p>
      <Link align="center" to={`/userinfo/${story.user_id}`}>
        {story.user_name}
      </Link>
      <p align="center">{story.body}</p>
      <p></p>
      <h2>Comentarios</h2>
      <GetComments
        align="center"
        storyUserId={story.user_id}
        comments={story.comments}
      />
      <div>
        <CreateComment />
        <p />
        <CreateVote />
      </div>
    </div>
  );
}

export default ViewStory;

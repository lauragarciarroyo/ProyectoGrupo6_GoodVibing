import { Link, Redirect, useParams } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";
import CreateComment from "./CreateComment";
import GetComments from "./GetComments";
import CreateVote from "./CreateVote";
import "./ViewStory.css";

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
    <aside>
      <h3 className="verhistoria">{story.title}</h3>

      <p align="center ">{new Date(story.date).toLocaleDateString()}</p>
      <div className="author">
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name} </Link>
      </div>
      <div className="story">
        <p>{story.body}</p>
      </div>
      <div className="comment">
        <div>
          <CreateComment />
        </div>
        <div className="Comments">
          <GetComments storyUserId={story.user_id} comments={story.comments} />
        </div>
      </div>
      <p />
      <div className="votos" align="center">
        <CreateVote />
      </div>
    </aside>
  );
}

export default ViewStory;

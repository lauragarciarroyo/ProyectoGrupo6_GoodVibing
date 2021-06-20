import { Redirect, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFetchToken from "./useFetchToken";
import { useDispatch, useSelector } from "react-redux";
import CreateComment from "./CreateComment";

function ViewStory() {
  const { user } = useSelector((state) => state.user);

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
      <Helmet>
        <title>Goodvibing app {story && "- " + story.title}</title>
      </Helmet>

      <h1>{story.title}</h1>
      <Link to="/userinfo">{user.name}</Link>

      <p>{story.body}</p>
      <br />
      <div>
        <CreateComment />
      </div>
    </div>
  );
}

export default ViewStory;

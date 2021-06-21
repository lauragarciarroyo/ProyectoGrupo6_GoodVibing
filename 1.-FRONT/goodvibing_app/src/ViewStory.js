import { Redirect, useParams, Link } from "react-router-dom";
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
      <h1>{story.data.title}</h1>
      <Link to="/userinfo">{user.name}</Link>

      <p>{story.data.body}</p>
      <p />
      <div>
        <CreateComment />
      </div>
    </div>
  );
}

export default ViewStory;

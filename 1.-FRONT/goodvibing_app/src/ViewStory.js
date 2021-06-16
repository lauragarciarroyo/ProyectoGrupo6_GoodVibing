import { Redirect, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";

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
      <Helmet>
        <title>Goodvibing app {story && "- " + story.name}</title>
      </Helmet>

      <h1>{story.title}</h1>
      <p>{story.body}</p>
    </div>
  );
}

export default ViewStory;
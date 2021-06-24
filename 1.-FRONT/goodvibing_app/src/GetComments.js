import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import DeleteComment from "./DeleteComment";

function GetComments() {
  const { id } = useParams();
  const results = useFetchToken(`http://localhost:4000/api/stories/${id}`);
  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="Comments">
        {results.data.comments.map((e) => (
          <li key={e.id}>
            <p>{e.text}</p>
            <p>{new Date(results.date).toLocaleDateString()}</p>
            <Link to={`/userinfo/${results.user_id}`}>{results.user_name}</Link>
          </li>
        ))}
        {!results.data.comments.length && <i>No hay comentarios</i>}
      </div>
      <div>
        <DeleteComment />
      </div>
    </>
  );
}

export default GetComments;

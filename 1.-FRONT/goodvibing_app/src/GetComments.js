import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetchToken from "./useFetchToken";

function GetComments() {
  const { id } = useParams();
  const comments = useFetchToken(`http://localhost:4000/api/stories/${id}`);
  return (
    <div>
      {comments.map((e) => (
        <li key={e.id}>
          <p>{e.comments}</p>
          <p>{new Date(comments.date).toLocaleDateString()}</p>
          <Link to={`/userinfo/${comments.user_id}`}>{comments.user_name}</Link>
        </li>
      ))}
      {!comments.length && <i>No hay comentarios</i>}
    </div>
  );
}

export default GetComments;

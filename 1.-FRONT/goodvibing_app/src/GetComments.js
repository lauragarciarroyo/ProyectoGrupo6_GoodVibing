import { useParams } from "react-router";
import useFetchToken from "./useFetchToken";

function GetComments() {
  const { id } = useParams();
  const results = useFetchToken(`http://localhost:4000/api/stories/${id}`);
  return (
    <div className="Comments">
      {results.map((e) => (
        <li key={e.id}>
          <p>{e.text}</p>
        </li>
      ))}
      {!results.length && <i>No hay comentarios</i>}
    </div>
  );
}

export default GetComments;

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function GetComments({ comments, storyUserId }) {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteComment = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      if (res.ok) {
        history.go(0);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <>
      <div className="Comments">
        {comments.map((e) => (
          <li key={e.id}>
            <p>{e.text}</p>
            <p>{new Date(e.date).toLocaleDateString()}</p>
            <Link to={`/userinfo/${e.user_id}`}>{e.username}</Link>
            {user.id === e.user_id || user.id === storyUserId ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  deleteComment(e.id);
                }}
              >
                Borrar comentario
              </button>
            ) : null}
          </li>
        ))}
      </div>
    </>
  );
}

export default GetComments;

import { useSelector } from "react-redux";

function DeleteStory({ comment_id }) {
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://localhost:4000/api/comments/${comment_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      await res.json();
    }
  };

  return (
    <div className="deletecomment" onSubmit={handleSubmit}>
      <button>Eliminar comentario</button>
    </div>
  );
}

export default DeleteStory;

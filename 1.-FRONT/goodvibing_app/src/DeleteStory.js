import { useSelector } from "react-redux";

function DeleteStory() {
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://localhost:4000/api/stories/:id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      await res.json();
    }
  };

  return (
    <div className="deletestory" onSubmit={handleSubmit}>
      <button>Eliminar historia</button>
    </div>
  );
}

export default DeleteStory;

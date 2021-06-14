import { useState } from "react";
import { useSelector } from "react-redux";

function CreateVote({ story_id }) {
  const token = useSelector((s) => s.user?.token);
  const [vote, setVote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://localhost:4000/api/stories/${story_id}/vote`,

      {
        method: "POST",
        body: JSON.stringify({ vote }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <form className="comment" onSubmit={handleSubmit}>
      <label>
        Voto
        <input value={vote} onChange={(e) => setVote(e.target.value)} />
      </label>
    </form>
  );
}

export default CreateVote;

//Crear  voto.
//añadir un botón para votar y quitar voto

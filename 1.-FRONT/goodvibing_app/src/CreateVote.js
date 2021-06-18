import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

function CreateVote({ story_id }) {
  const token = useSelector((s) => s.user?.token);
  const [vote, setVote] = useState("");
  const { id } = useParams;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}/vote`,

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
    <form className="Voto" onSubmit={handleSubmit}>
      <label>
        Voto
        <input value={vote} onChange={(e) => setVote(e.target.value)} />
      </label>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
        label="Custom icon"
      />
    </form>
  );
}

export default CreateVote;

//Crear  voto.
//añadir un botón para votar y quitar voto

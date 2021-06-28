import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import "fontsource-roboto";
import DeleteVote from "./DeleteVote";

function CreateVote() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams;
  const [vote, setVote] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVote({ ...vote, [e.vote]: e.target.checked });
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
    <div>
      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              onChange={(e) => setVote(e.target.value)}
              value={vote}
            />
          }
          label="Me gusta"
        />
        <DeleteVote />
      </form>
    </div>
  );
}

export default CreateVote;

//Crear  voto.
//añadir un botón para votar y quitar voto

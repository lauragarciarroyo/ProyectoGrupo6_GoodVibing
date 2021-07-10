import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "fontsource-roboto";
import DeleteVote from "./DeleteVote";
import { ContadorComponent } from "./ContadorVotes";

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
      <ContadorComponent />
      <DeleteVote />
    </div>
  );
}

export default CreateVote;

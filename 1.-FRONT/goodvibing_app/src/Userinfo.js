import { Button } from "@material-ui/core";

function Userinfo({ user }) {
  return (
    <div className="userinfo">
      <h2>{user.name}</h2>
      <p />
      <p>{user.bio}</p>
      <p>{user.residence}</p>
      <p>{new Date(user.birthdate).toLocaleDateString()}</p>
      <p>{user.email}</p>
      <p />
      <div>
        <Button href="/viewstories/:id" color="primary">
          Ver historias del usuario
        </Button>{" "}
      </div>
    </div>
  );
}

export default Userinfo;

//Muestra la info de un usuario, petición tipo GET a /api/users/:user_id, con token
//Se muestran en profile, pero además hay que llegar a userinfo desde viewstory(/story/:id)

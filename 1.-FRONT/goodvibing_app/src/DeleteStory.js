import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

function DeleteStory() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de eliminar tu historia?")) {
      const res = await fetch(`http://localhost:4000/api/stories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      if (res.ok) {
        history.push("/mystories");
      } else {
        dispatch({ type: "SET_ERROR", message: data.message });
      }
    }
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Button
          style={{ margin: 200 }}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Eliminar historia
        </Button>
      </form>
    </div>
  );
}

export default DeleteStory;

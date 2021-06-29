import { Redirect, useParams } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";
import CreateComment from "./CreateComment";
import GetComments from "./GetComments";
import CreateVote from "./CreateVote";
import { Box, Button, makeStyles } from "@material-ui/core";

function ViewStory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [story, error] = useFetchToken(
    `http://localhost:4000/api/stories/${id}`
  );

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));

  const classes = useStyles();

  if (error) {
    dispatch({ type: "SET_ERROR", message: error });
    return <Redirect to="/" />;
  }

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story">
      <div className={classes.paper}>
        <h1 align="center">{story.title}</h1>

        <p align="center">{new Date(story.date).toLocaleDateString()}</p>
        <Box
          borderRadius={50}
          justifyContent="center"
          alignItems="center"
          boxShadow={20}
          p={2}
          m={2}
          display="block"
          css={{ maxWidth: 900 }}
        >
          <Button fullWidth color="primary" href={`/userinfo/${story.user_id}`}>
            {story.user_name}
          </Button>

          <p align="center">{story.body}</p>
        </Box>
        <h2>Comentarios</h2>
        <GetComments
          align="center"
          storyUserId={story.user_id}
          comments={story.comments}
        />

        <div>
          <CreateComment />

          <p />

          <CreateVote />
        </div>
      </div>
    </div>
  );
}

export default ViewStory;

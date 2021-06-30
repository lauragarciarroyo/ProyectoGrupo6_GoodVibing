import { Button, Grid, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import useFetch from "./UseFetch";
import StoryTitle from "./StoryTitle";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/storieshome`);

  const defaultProps = {
    bgcolor: "background",
    m: 20,
    style: { width: "100rem", height: "25rem" },
    borderColor: "text.primary",
  };

  const useStyles = makeStyles((theme) => ({
    div: {
      height: 50,
      width: 300,
    },
  }));
  const classes = useStyles();

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Historias" style={{ margin: "2rem 0" }}>
      <Grid item>
        <Grid container>
          {results.data.map((e) => (
            <Box
              borderRadius={16}
              justifyContent="center"
              alignItems="center"
              mx="auto"
              boxShadow={20}
              bgcolor="background.paper"
              display="block"
              css={{ maxWidth: 450, maxHeight: 200, margin: "1rem auto" }}
              {...defaultProps}
              p={3}
            >
              <div className={classes.paper}>
                <div key={e.id}>
                  <StoryTitle href={`/story/${e.id}`}>{e.title}</StoryTitle>
                  <p>{e.body}</p>
                </div>
              </div>
            </Box>
          ))}
          {!results.data.length && <i>No se han encontrado historias</i>}
        </Grid>
      </Grid>
    </div>
  );
}

export default StoriesHome;

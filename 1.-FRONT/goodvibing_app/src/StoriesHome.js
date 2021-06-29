import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import useFetch from "./UseFetch";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/storieshome`);

  const defaultProps = {
    bgcolor: "background.paper",
    m: 1,
    style: { width: "50rem", height: "25rem" },
    borderColor: "text.primary",
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      height: 50,
      width: 300,
    },
  }));
  const classes = useStyles();

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Historias">
      <Grid item xs={16}>
        <Grid container spacing={1}>
          {results.data.map((e) => (
            <Box
              justifyContent="center"
              alignItems="center"
              mx="auto"
              border={1}
              boxShadow={3}
              bgcolor="background.paper"
              display="block"
              css={{ maxWidth: 400 }}
              {...defaultProps}
              p={3}
            >
              <Paper className={classes.paper}>
                <div key={e.id}>
                  <Button href={`/story/${e.id}`} color="primary">
                    {e.title}
                  </Button>
                  <p>{e.body}</p>
                </div>
              </Paper>
            </Box>
          ))}
          {!results.data.length && <i>No se han encontrado historias</i>}
        </Grid>
      </Grid>
    </div>
  );
}

export default StoriesHome;

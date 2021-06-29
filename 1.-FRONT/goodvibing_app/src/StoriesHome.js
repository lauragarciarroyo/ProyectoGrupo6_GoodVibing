import { Button, Grid, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import useFetch from "./UseFetch";

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
    <div className="Historias">
      <Grid item xs={12}>
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
              css={{ maxWidth: 450, maxHeight: 200 }}
              {...defaultProps}
              p={3}
            >
              <div className={classes.paper}>
                <div key={e.id}>
                  <Button href={`/story/${e.id}`} fullWidth color="primary">
                    {e.title}
                  </Button>
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

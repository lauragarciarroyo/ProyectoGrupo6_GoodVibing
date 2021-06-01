const {
  storiesRepository,
  usersRepository,
  votesRepository,
} = require("../repositories");

async function createVotes(req, res, next) {
  try {
    const { vote_id } = req.body;
    const { id } = req.auth;
    const { story_id } = req.params;

    const vote = await votesRepository.findVotesById({ vote_id });

    if (vote) {
      const err = new Error("No puedes votar dos veces");
      err.code = 401;
      throw err;
    }

    const data = { id, story_id, vote_id };
    const dataVotes = await votesRepository.createVotes(data);

    res.send({
      status: "ok",
      data: dataVotes,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteVotes(req, res, next) {
  try {
    const { story_id } = req.params;
    const { user_id } = req.auth;
    const { vote, id } = req.body;

    const story = await storiesRepository.findStoriesById({ story_id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.code = 404;

      throw err;
    }
    const user = await usersRepository.findUserById({ user_id });
    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }

    const voteUser = await votesRepository.findVotesById({ id });

    if (user !== voteUser.id) {
      const err = new Error("Aún no has votado");
      err.code = 401;
      throw err;
    }

    const data = { id: user_id, story_id, vote };
    await votesRepository.deleteVotes(data);

    res.send({
      status: "ok",
      message: "Voto borrado",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createVotes, deleteVotes };

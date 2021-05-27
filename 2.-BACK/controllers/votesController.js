const {
  storiesRepository,
  usersRepository,
  votesRepository,
} = require("../repositories");

async function createVotes(req, res, next) {
  try {
    const { story_id } = req.params;
    const { id } = req.auth;

    const story = await storiesRepository.findStoriesById({ id: story_id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.code = 404;

      throw err;
    }

    const user = await usersRepository.findUserById({ id });
    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }
    const vote = await votesRepository.findVotesById({ id });

    if (vote) {
      const err = new Error("No puedes votar dos veces");
      err.code = 400;
      throw err;
    }

    const data = { user_id: id, story_id, vote };
    await votesRepository.createVotes(data);

    res.send({
      status: "ok",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteVotes(req, res) {
  try {
    const { storiesId } = req.params;
    const { usersId } = req.auth;
    const { votes } = req.votes;

    //const schema = Joi.objetc ({
    //   votes: Joi.number().max(1),
    // })

    //await schema.validateAsync ({votes});

    const story = await storiesRepository.findStoriesById(id);

    if (!story) {
      const err = new Error("No existe la historia");
      err.code = 404;

      throw err;
    }
    const user = await usersRepository.findUserById(usersId);
    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }

    const { votingUser } = req.params; //////////////////////////////////////////////////////////REVISAR////////////////////////////////////////////////

    if (user !== votingUser) {
      const err = new Error("El usuario no tiene permiso");
      err.code = 401;
      throw err;
    }

    const data = { usersId: id, storiesId, votes };
    const rating = await votesRepository.deleteVotes(data);

    res.status(204);
  } catch (err) {
    next(err);
  }
}

module.exports = { createVotes, deleteVotes };

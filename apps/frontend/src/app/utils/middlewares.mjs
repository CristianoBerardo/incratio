import { mockUsers } from './constants.mjs';

export const resolveIndexUserById = (req, res, next) => {
  console.log('middleware_resolveIndexUserById');
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const findUser = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUser === -1)
    return res.status(404).send({ message: 'User not found' });
  req.findUserIndex = findUser;
  next();
};
import { Router } from 'express';
import { mockUsers } from '../utils/constants.mjs';

const router = Router();


const middleWare = (req, res, next) => {
  console.log('middleware');
  next();
};

router.use(middleWare);

router.get('/api/users', (req, res) => {
  console.log(req.query);

  // const {
    // query: { filter, value },
  // } = req;

  //return all usere when no filter and value is provided
  // if (!filter && !value) {
    return res.status(200).send(mockUsers);
  // }

  //http://localhost:3000/api/users?filter=username&value=an
  // if (filter && value) {
  //   const result = mockUsers.filter((user) => user[filter].includes(value));
  //   return res.send(result);
  // }

  // return res.send(mockUsers);
});

router.get(
  '/',
  (req, res, next) => {
    console.log('route /');
    next();
  },
  (req, res) => {
    res.status(200).send({ message: 'Hello World!' });
  }
);

router.get('/api/users/:id', (req, res) => {
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) {
    return res.status(400).send({ message: 'Invalid ID supplied' });
  }

  const findUsers = mockUsers.find((user) => user.id === parseId);

  if (!findUsers) {
    return res.sendStatus(404);
  }

  return res.send(findUsers);
});

export default router;

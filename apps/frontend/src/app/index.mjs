import express from 'express';
import userRouter from './Routers/users.mjs';
import { mockUsers } from './utils/constants.mjs';
import { resolveIndexUserById } from './utils/middlewares.mjs';
import cose from 'cors';

const app = express();

app.use(cose());

app.use(express.json());




app.use(userRouter);

const logginMiddleware = (req, res, next) => {
  console.log(req.method + ' - ' + req.url);
  next();
};

// const resolveIndexUserById = (req, res, next) => {
//   const {
//     params: { id },
//   } = req;
//   const parsedId = parseInt(id);

//   if (isNaN(parsedId)) {
//     return res.sendStatus(400);
//   }

//   const findUser = mockUsers.findIndex((user) => user.id === parsedId);
//   if (findUser === -1)
//     return res.status(404).send({ message: 'User not found' });
//   req.findUserIndex = findUser;
//   next();
// };

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.get(
//   '/',
//   (req, res, next) => {
//     console.log('route /');
//     next();
//   },
//   (req, res) => {
//     res.status(200).send({ message: 'Hello World!' });
//   }
// );

// app.get('/api/users', (req, res) => {
//   console.log(req.query);

//   const {
//     query: { filter, value },
//   } = req;

//   //return all usere when no filter and value is provided
//   if (!filter && !value) {
//     return res.status(200).send(mockUsers);
//   }

//   //http://localhost:3000/api/users?filter=username&value=an
//   if (filter && value) {
//     const result = mockUsers.filter((user) => user[filter].includes(value));
//     return res.send(result);
//   }

//   return res.send(mockUsers);
// });

// app.get('/api/users/:id', (req, res) => {
//   const parseId = parseInt(req.params.id);
//   if (isNaN(parseId)) {
//     return res.status(400).send({ message: 'Invalid ID supplied' });
//   }

//   const findUsers = mockUsers.find((user) => user.id === parseId);

//   if (!findUsers) {
//     return res.sendStatus(404);
//   }

//   return res.send(findUsers);
// });

app.use(logginMiddleware);

app.post('/api/users', (req, res) => {
  console.log(req.body);

  mockUsers.push(req.body);

  return res.send({ message: 'User created successfully' });
});

app.put('/api/users/:id', resolveIndexUserById, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.send({ message: 'User updated' });
});

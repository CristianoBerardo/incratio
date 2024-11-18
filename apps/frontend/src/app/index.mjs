import express from 'express';
import { array_analysis } from './prova.mjs';
 

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World!' });
});

const mockUsers = [
  { id: 1, username: 'anson', displayName: 'Anson' },
  { id: 2, username: 'jack', displayName: 'Jack' },
  { id: 3, username: 'adam', displayName: 'Adam' },
  { id: 4, username: 'tina', displayName: 'Tina' },
  { id: 5, username: 'jason', displayName: 'Jason' },
  { id: 6, username: 'henry', displayName: 'Henry' },
  { id: 7, username: 'marilyn', displayName: 'Marilyn' },
];

app.get('/api/users', (req, res) => {
  console.log(req.query);

  const {
    query: { filter, value },
  } = req;

  //return all usere when no filter and value is provided
  if (!filter && !value) {
    return res.send(array_analysis);
  }

  //http://localhost:3000/api/users?filter=username&value=an
  if (filter && value) {
    const result = mockUsers.filter((user) => user[filter].includes(value));
    return res.send(result);
  }

  res.send(mockUsers);
});

app.get('/api/users/:id', (req, res) => {
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

app.post('/api/users', (req, res) => {
  console.log(req.body);

  
  mockUsers.push(req.body);

  return res.send({ message: 'User created successfully' });
});

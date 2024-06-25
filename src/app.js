import express from 'express';
import connectDatabase from './config/dbConnect.js';
import book from './models/Book.js';

const connection = await connectDatabase();

connection.on('error', (error) => {
   console.error('Connection error', error);
});

connection.once('open', () => {
   console.log('Success Connection');
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).send('Node.js Course');
});

app.get('/books', async (req, res) => {
   const listBooks = await book.find({});
   res.status(200).json(listBooks);
});

app.get('/books/:id', (req, res) => {
   const index = getBook(req.params.id);
   res.status(200).json(books[index]);
});

app.post('/books', (req, res) => {
   books.push(req.body);
   res.status(201).send('Successfully Created!');
});

app.put('/books/:id', (req, res) => {
   const index = getBook(req.params.id);
   books[index].title = req.body.title;
   res.status(201).send('Successfully Updated!');
});

app.delete('/books/:id', (req, res) => {
   const index = getBook(req.params.id);
   books.splice(index, 1);
   res.status(204).send('Successfully Deleted!');
});

export default app;

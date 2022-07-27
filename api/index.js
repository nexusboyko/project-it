import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// import './redis/client.js';
import { loadList, addItemID, getItemCount, delItemID } from './redis/list.js';
import {
  addItemJson,
  delItemJson,
  loadItemId,
  loadItemJson,
} from './redis/item.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get all item IDs from a list
app.get('/api/public/projects', async (req, res) => {
  try {
    const items = [];
    const list = await loadList();
    
    for (let i = 0; i < list.length; i++) {
      const item = await loadItemJson(list[i]);
      items.push(JSON.parse(item));
    }
    res.header('Content-Type', 'application/json');
    res.send(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

/*
 *  Add single card item to projects list
 */
app.post('/api/public/projects', async (req, res) => {
  try {
    addItemJson(req.body.id, JSON.stringify(req.body));
    addItemID(req.body.id);

    res.header('Content-Type', 'application/json');
    res.send(req.body);
  } catch (error) {
    res.sendStatus(500);
  }
});

// SINGLE ITEM FUNCTIONS

/*
 *  Get single card item given ID
 */
app.get('/api/card', async (req, res) => {
  const id = req.body.id;

  try {
    const item = await loadItemJson(id);

    res.header('Content-Type', 'application/json');
    res.send(JSON.parse(item));
  } catch (error) {
    res.sendStatus(500);
  }
});

/*
 *  Edit single card item
 */
app.put('/api/card', async (req, res) => {
  try {
    addItemJson(req.body.id, JSON.stringify(req.body));

    res.header('Content-Type', 'application/json');
    res.send(req.body);
  } catch (error) {
    res.sendStatus(500);
  }
});

/*
 *  Delete single card item
 */
app.delete('/api/card', async (req, res) => {
  try {
    delItemID(req.body.id);
    delItemJson(req.body.id);

    res.header('Content-Type', 'application/json');
    res.send(req.body.id);
  } catch (error) {
    res.sendStatus(500);
  }
});

const port = 3001;
app.listen(
  port,
  // eslint-disable-next-line no-console
  () => console.log(`Example app listening at http://localhost:${port}`)
);

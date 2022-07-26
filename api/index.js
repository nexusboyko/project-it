import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// import './redis/client.js';
import { addItemID, getItemCount, delItemID } from './redis/list.js';
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
    const numItems = await getItemCount();

    for (let i = 0; i < numItems; i++) {
      const listItemId = await loadItemId(i);
      const listItem = await loadItemJson(listItemId);
      items.push(listItem);
    }
    items.reverse();

    res.header('Content-Type', 'application/json');
    res.send(items);
  } catch (error) {
    // logErrorMessage(userInfo, error);
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
    // logErrorMessage(userInfo, error);
    res.sendStatus(500);
  }
});

// SINGLE ITEM FUNCTIONS

/*
 *  Get single card item
 */
app.get('/api/card', async (req, res) => {
  try {
    const id = await loadListItem(0);
    const item = await loadItemJson(id);

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(item));
  } catch (error) {
    // logErrorMessage(userInfo, error);
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
    // logErrorMessage(userInfo, error);
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
    // logErrorMessage(userInfo, error);
    res.sendStatus(500);
  }
});

const port = 3001;
app.listen(
  port,
  // eslint-disable-next-line no-console
  () => console.log(`Example app listening at http://localhost:${port}`)
);

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {
  addItemID,
  addItemJson,
  getItemCount,
  loadItemJson,
  loadList,
  loadListItem,
} from './redis/client.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defines path to where data is sent
app.get('/api/list', async (req, res) => {
  console.log('REQUEST: ' + req.method);
  try {
    const items = [];
    const numItems = await getItemCount();

    for (let i = 0; i < numItems; i++) {
      const listItemId = await loadListItem(i);
      const listItem = await loadItemJson(listItemId);
      items.push(listItem);
    }
    items.reverse();

    res.header('Content-Type', 'application/json');
    res.send(items);
  } catch (error) {
    logErrorMessage(userInfo, error);
    res.sendStatus(500);
  }
});

app.post('/api/list', async (req, res) => {
  console.log('REQUEST: ' + req.method);
  console.log('ITEM POSTED:', req.body);
  console.log('ITEM STRING:', JSON.stringify(req.body));
  try {
    addItemJson(req.body.id, JSON.stringify(req.body));
    addItemID(req.body.id);

    res.header('Content-Type', 'application/json');
    res.send(req.body);
  } catch (error) {
    logErrorMessage(userInfo, error);
    res.sendStatus(500);
  }
});

const port = 3001;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

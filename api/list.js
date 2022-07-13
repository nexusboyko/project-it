import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { getItemCount, loadItemJson, loadList, loadListItem } from './redis/client.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Defines path to where data is sent
app.get('/api/list', async (req, res) => {
  try {
    const items = [];
    const numItems = await getItemCount();

    for(let i = 0; i < numItems; i++) {
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

const port = 3001;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

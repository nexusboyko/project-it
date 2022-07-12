import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import 
{ loadList, 
  loadListItem
} from "./redis/client.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Defines path to where data is sent
app.get("/api/list", async (req, res) => {
  try {
    const items = [];

    let i = 0;
    do {
      const listItem = await loadListItem(i);
      items.push(listItem);
      i++;
    } while (i < 2);
    
    res.header("Content-Type", "application/json");
    res.send(items);

  } catch (error) {
    logErrorMessage(userInfo, error);
    res.sendStatus(500);
  }
});

const port = 3001;
app.listen(
  port,
  // eslint-disable-next-line no-console
  () => console.log(`Example app listening at http://localhost:${port}`)
);

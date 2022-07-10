import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { loadProject } from "./redis/client.js";

const app = express();
// TODO: pass options for localhost only
app.use(cors());
app.use(bodyParser.json());

app.get("/api/projects", async (req, res) => {
  try {
    const project = await loadProject();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(project));
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

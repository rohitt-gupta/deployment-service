import express from "express";
import cors from 'cors';
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from 'path';
import fs from 'fs-extra'
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import { lpush } from "./sqs";
const app = express();
app.use(cors());
app.use(express.json());


app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate(); // asd12
  const dir = path.join(__dirname, 'output', id.toString());
  await simpleGit().clone(repoUrl, dir);

  const files = getAllFiles(dir)
  console.log("files", files);


  files.forEach(async file => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  })

  lpush(id);
  // 

  // push this to s3
  res.json({
    id: id
  })
});

app.listen(3000);
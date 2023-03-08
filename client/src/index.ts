import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { jokeClient, voiceClient } from "./proto/config";
import { prepareClientResponse } from "./utils";
import * as fs from "fs";
import * as buffer from "buffer";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

const PORT = Number(process.env.CLIENT_PORT);

const app = express();

app.get("/", (req, res) => {
  return jokeClient.generateJoke({}, (err, value) => {
    res.json(prepareClientResponse(err, value));
  });
});

app.get("/all", (req, res) => {
  return jokeClient.findAll({}, (err, value) => {
    res.json(prepareClientResponse(err, value));
  });
});

app.get("/voice", (req, res) => {
  return voiceClient.generateVoice(
    {
      joke: {
        id: 0,
        text: "Fuck Russia, Fuck Putin, Fuck all of russians",
        tags: ["test"],
        createdAt: new Date().toISOString()
      },
    },
    (err, value) => {
      if (err) throw err;


      fs.writeFile("audio.mp3", value?.chunkData!, () => {
        console.log('Audio has successfully been written');
      });

      res.setHeader("Content-Type", "audio/mpeg");
      res.send(value);
    }
  );
});

app.listen(PORT, () => {
  console.log("Express service is listening on port", PORT);
});

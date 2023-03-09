import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { jokeClient, voiceClient } from "./proto/config";
import { prepareClientResponse } from "./utils";
import * as fs from "fs";
import { ServiceError } from "@grpc/grpc-js";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

const PORT = Number(process.env.CLIENT_PORT);

const app = express();

app.get("/", (req, res) => {
  return jokeClient.generateJoke({}, (err: ServiceError | null, value: any) => {
    res.json(prepareClientResponse(err, value));
  });
});

app.get("/all", (req, res) => {
  return jokeClient.findAll({}, (err: ServiceError | null, value: any) => {
    res.json(prepareClientResponse(err, value));
  });
});

app.get("/voice", (req, res) => {
  return voiceClient.generateVoice(
    {
      joke: {
        id: 0,
        text: "Fuck Russia, Fuck Putin, Fuck all of russians pidorasssssssssss",
        tags: ["test"],
        createdAt: new Date().toISOString()
      },
    },
      (err, value) => {
      if (err) throw err;

        const buffer = value?.chunkData!; // Replace this with your own code to get the audio buffer

        fs.writeFileSync(`test.wav`, buffer)
        console.log('Audio has successfully been written');

      res.setHeader("Content-Type", "audio/mpeg");
      res.send(buffer);
    }
  );
});

app.listen(PORT, () => {
  console.log("Express service is listening on port", PORT);
});

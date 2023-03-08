import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as dotenv from "dotenv";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { JokeServiceClient } from "./generated/jokes/JokeService";
import { VoiceServiceClient } from "./generated/voice/VoiceService";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

const VOICE_PROTO_FILE_PATH = path.join(
  process.cwd(),
  "..",
  "proto",
  "voice.proto"
);
const JOKE_PROTO_FILE_PATH = path.join(
  process.cwd(),
  "..",
  "proto",
  "joke.proto"
);
const PROTO_OPTIONS: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(
  [VOICE_PROTO_FILE_PATH, JOKE_PROTO_FILE_PATH],
  PROTO_OPTIONS
);
const protoDescriptor = loadPackageDefinition(packageDefinition);
const jokesPackage = protoDescriptor.jokes as any;
const voicePackage = protoDescriptor.voice as any;

const jokeServicePort = Number(process.env.RANDOM_STUFF_SERVICE_PORT);
const voiceServicePort = Number(process.env.VOICE_TEXT_SERVICE_PORT);

export const jokeClient: JokeServiceClient = new jokesPackage.JokeService(
  `localhost:${jokeServicePort}`,
  credentials.createInsecure()
);

export const voiceClient: VoiceServiceClient = new voicePackage.VoiceService(
  `localhost:${voiceServicePort}`,
  credentials.createInsecure()
);

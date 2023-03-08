import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import { JokeServiceHandlers } from "./generated/jokes/JokeService";
import { findAll, findOne, generateVoice } from "../handlers";
import { VoiceServiceHandlers } from "./generated/voice/VoiceService";

const PROTO_FILE_PATH = path.join(process.cwd(), "..", "proto", "voice.proto");
const PROTO_OPTIONS: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

export const initializeProtoServer = async (): Promise<Server> => {
  const server = new Server();
  const packageDefinition = await protoLoader.load(
    PROTO_FILE_PATH,
    PROTO_OPTIONS
  );
  const protoDescriptor = loadPackageDefinition(packageDefinition);

  const voicePackage = protoDescriptor.voice as any;

  server.addService(voicePackage.VoiceService.service, {
    generateVoice,
    findAll,
    findOne
  } as VoiceServiceHandlers);

  return server;
};

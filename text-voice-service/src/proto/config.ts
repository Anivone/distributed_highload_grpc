import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import { JokeServiceHandlers } from "./generated/jokes/JokeService";
import { findAll, findOne, generateJoke } from "../handlers";

const PROTO_FILE_PATH = path.join(process.cwd(), "..", "proto", "joke.proto");
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

  const jokePackage = protoDescriptor.jokes as any;

  server.addService(jokePackage.JokeService.service, {
    generateJoke,
    findAll,
    findOne
  } as JokeServiceHandlers);

  return server;
};

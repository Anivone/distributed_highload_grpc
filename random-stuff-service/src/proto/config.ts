import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { GrpcObject, loadPackageDefinition } from "@grpc/grpc-js";

const PROTO_FILE_PATH = path.join(process.cwd(), "..", "proto", "joke.proto");
const PROTO_OPTIONS: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

export const initializeProto = async (): Promise<GrpcObject> => {
  const packageDefinition = await protoLoader.load(
    PROTO_FILE_PATH,
    PROTO_OPTIONS
  );
  return loadPackageDefinition(packageDefinition);
};

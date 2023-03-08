import { initializeProtoServer } from "./proto/config";
import { ServerCredentials } from "@grpc/grpc-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

const PORT = Number(process.env.RANDOM_STUFF_SERVICE_PORT);

initializeProtoServer().then((server) => {
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) throw error;

      console.log("Server is listening on port", port);
      server.start();
    }
  );
});

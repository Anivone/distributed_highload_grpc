import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

export type UnaryHandlerFn<Request, Response> = (
  call: ServerUnaryCall<Request, Response>,
  callback: sendUnaryData<Response>
) => void;
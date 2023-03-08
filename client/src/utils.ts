import { ServiceError } from "@grpc/grpc-js";

export const prepareClientResponse = (err: ServiceError | null, value: any) => ({
  status: err ? 500 : 201,
  data: value
});
import { UnaryHandlerFn } from "./types";
import { EntityId } from "../proto/generated/core/EntityId";
import { Voice } from "../proto/generated/voice/Voice";

export const findOne: UnaryHandlerFn<EntityId, Voice> = (call, callback) => {
  const id = call.request.id;

  callback(null, {
    id,
    chunkData: Buffer.from([]),
    joke: {},
    createdAt: new Date().toISOString(),
  })
}
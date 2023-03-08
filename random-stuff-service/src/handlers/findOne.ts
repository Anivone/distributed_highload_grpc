import { UnaryHandlerFn } from "./types";
import { EntityId } from "../proto/generated/core/EntityId";
import { Joke } from "../proto/generated/jokes/Joke";

export const findOne: UnaryHandlerFn<EntityId, Joke> = (call, callback) => {
  const id = call.request.id;

  callback(null, {
    id,
    text: "test",
    tags: ["test"],
    createdAt: new Date().toISOString(),
  })
}
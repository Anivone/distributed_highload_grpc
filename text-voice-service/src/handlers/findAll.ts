import { UnaryHandlerFn } from "./types";
import { Empty } from "../proto/generated/core/Empty";
import { JokesList } from "../proto/generated/jokes/JokesList";

export const findAll: UnaryHandlerFn<Empty, JokesList> = (call, callback) => {
  callback(null, { joke: [] });
}
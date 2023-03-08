import { UnaryHandlerFn } from "./types";
import { Empty } from "../proto/generated/core/Empty";
import { Joke } from "../proto/generated/jokes/Joke";
import { fetchJoke } from "../api/fetchJoke";

export const generateJoke: UnaryHandlerFn<Empty, Joke> = async (call, callback) => {
  const joke = await fetchJoke();
  callback(null, joke);
};

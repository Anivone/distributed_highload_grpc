import { UnaryHandlerFn } from "./types";
import { Empty } from "../proto/generated/core/Empty";
import { Joke } from "../proto/generated/jokes/Joke";

export const generateJoke: UnaryHandlerFn<Empty, Joke> = (call, callback) => {};

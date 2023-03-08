import { UnaryHandlerFn } from "./types";
import { Empty } from "../proto/generated/core/Empty";
import { VoicesList } from "../proto/generated/voice/VoicesList";

export const findAll: UnaryHandlerFn<Empty, VoicesList> = (call, callback) => {
  callback(null, { voices: [] });
}
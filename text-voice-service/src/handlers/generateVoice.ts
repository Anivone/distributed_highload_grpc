import { UnaryHandlerFn } from "./types";
import { GenerateVoice } from "../proto/generated/voice/GenerateVoice";
import { Voice } from "../proto/generated/voice/Voice";
import { fetchVoice } from "../api/fetchVoice";

export const generateVoice: UnaryHandlerFn<GenerateVoice, Voice> = async (
  call,
  callback
) => {
  const joke = call.request.joke;
  if (!joke?.text) {
    callback(new Error("Joke was not provided"));
  }

  const voiceBuffer = await fetchVoice(joke?.text ?? "");
  callback(null, {
    id: 0,
    chunkData: voiceBuffer,
    joke,
    createdAt: new Date().toISOString(),
  })
};

import axios, { AxiosResponse } from "axios";
import { Joke } from "../proto/generated/jokes/Joke";

export const fetchJoke = async (): Promise<Joke> => {
  const response = await axios.get(
    "https://random-stuff-api.p.rapidapi.com/joke/random",
    {
      params: {
        exclude: "dirty,sex,racism"
      },
      headers: {
        Authorization: process.env.RANDOM_STUFF_API_KEY,
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "random-stuff-api.p.rapidapi.com",
      },
    }
  );

  return transformResponseToJoke(response);
};

const transformResponseToJoke = (response: AxiosResponse): Joke => {
  const data = response.data;

  return {
    text: data.message,
    tags: data.tags,
    createdAt: new Date().toISOString(),
  };
};

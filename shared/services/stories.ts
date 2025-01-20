import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Routes } from "./routes";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>(Routes.STORIES);

  return data;
};

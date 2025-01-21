import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Paths } from "./paths";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>(Paths.STORIES);

  return data;
};
